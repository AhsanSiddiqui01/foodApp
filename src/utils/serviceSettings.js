import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { now } from './serverTime';

// Ordering hours the owner sets in the Settings tab (Firestore settings/app). Times are
// minutes after midnight in each customer's own time zone; days use 0 = Sunday ... 6 = Saturday.
// firestore.rules (inOrderWindow) enforces the same values on the server.
export const DEFAULT_SETTINGS = {
  openMinute: 9 * 60,
  closeMinute: 17 * 60,
  openDays: [0, 1, 2, 3, 4, 5, 6],
  paused: false,
};

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let current = DEFAULT_SETTINGS;
const listeners = new Set();
const settingsDoc = () => firestore().collection('settings').doc('app');

const setCurrent = (data) => {
  current = { ...DEFAULT_SETTINGS, ...(data || {}) };
  listeners.forEach((listener) => listener(current));
};

// Live-sync for the whole app (started in App.js); readable before sign-in too.
// A Firestore listener that errors (offline, rules not yet published, ...) stops for good, so
// it is re-created after a short wait, on sign-in / sign-out and when the app comes back.
const RETRY_MS = 15 * 1000;
export const startServiceSettingsSync = () => {
  let unsubscribe = null;
  let retryTimer = null;
  const subscribe = () => {
    clearTimeout(retryTimer);
    if (unsubscribe) {
      unsubscribe();
    }
    unsubscribe = settingsDoc().onSnapshot(
      (snapshot) => setCurrent(snapshot.exists ? snapshot.data() : null),
      (error) => {
        console.log('service settings error', error);
        unsubscribe = null;
        retryTimer = setTimeout(subscribe, RETRY_MS);
      },
    );
  };
  subscribe();
  const stopAuth = auth().onAuthStateChanged(() => subscribe());
  const appState = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      subscribe();
    }
  });
  return () => {
    clearTimeout(retryTimer);
    if (unsubscribe) {
      unsubscribe();
    }
    stopAuth();
    appState.remove();
  };
};

export const getServiceSettings = () => current;

// Re-renders the component whenever the owner changes the settings
export const useServiceSettings = () => {
  const [settings, setSettings] = useState(current);
  useEffect(() => {
    listeners.add(setSettings);
    setSettings(current);
    return () => listeners.delete(setSettings);
  }, []);
  return settings;
};

// Saves and applies the change in this app right away (the live listener confirms it later)
export const saveServiceSettings = (changes) =>
  settingsDoc()
    .set({ ...changes, updatedAt: firestore.FieldValue.serverTimestamp() }, { merge: true })
    .then(() => setCurrent({ ...current, ...changes }));

// 540 -> "9:00 AM"
export const formatMinutes = (minutes) => {
  const hour24 = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${hour24 < 12 ? 'AM' : 'PM'}`;
};

export const hoursText = (settings = current) =>
  `${formatMinutes(settings.openMinute)} to ${formatMinutes(settings.closeMinute)}`;

// Working days in short form, Monday first; runs of 3+ days join with a dash:
// [1..5] -> "Mon – Fri", [1, 3, 5] -> "Mon, Wed, Fri", all -> "Every day"
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
export const daysSummary = (openDays = current.openDays) => {
  if (openDays.length === 7) {
    return 'Every day';
  }
  const ordered = WEEK_ORDER.filter((day) => openDays.includes(day));
  const runs = [];
  ordered.forEach((day) => {
    const last = runs[runs.length - 1];
    if (last && WEEK_ORDER.indexOf(day) === WEEK_ORDER.indexOf(last[last.length - 1]) + 1) {
      last.push(day);
    } else {
      runs.push([day]);
    }
  });
  const short = (day) => DAY_NAMES[day].slice(0, 3);
  return runs
    .map((run) => (run.length >= 3
      ? `${short(run[0])} – ${short(run[run.length - 1])}`
      : run.map(short).join(', ')))
    .join(', ');
};

// "Mon, Wed, Fri · 9:00 AM – 5:00 PM"
export const scheduleText = (settings = current) =>
  `${daysSummary(settings.openDays)} · ${formatMinutes(settings.openMinute)} – ${formatMinutes(settings.closeMinute)}`;

// Why ordering is closed right now, or null when it is open
export const closedReason = (date = now(), settings = current) => {
  if (settings.paused) {
    return 'paused';
  }
  if (!settings.openDays.includes(date.getDay())) {
    return 'dayOff';
  }
  const minute = date.getHours() * 60 + date.getMinutes();
  if (minute < settings.openMinute || minute >= settings.closeMinute) {
    return 'hours';
  }
  return null;
};

export const isOpenNow = (date = now(), settings = current) => closedReason(date, settings) === null;

// Next day (from today) the kitchen takes orders, e.g. "tomorrow" / "Monday"
const nextOpenDay = (date, settings) => {
  const minute = date.getHours() * 60 + date.getMinutes();
  for (let offset = 0; offset < 8; offset += 1) {
    const day = (date.getDay() + offset) % 7;
    const laterToday = offset === 0 && minute < settings.openMinute;
    if (settings.openDays.includes(day) && (offset > 0 || laterToday)) {
      if (offset === 0) {
        return 'today';
      }
      return offset === 1 ? 'tomorrow' : DAY_NAMES[day];
    }
  }
  return null;
};

// One line for headers / banners, e.g. "Ordering open till 5:00 PM"
export const statusLine = (date = now(), settings = current) => {
  const reason = closedReason(date, settings);
  if (!reason) {
    return `Ordering open till ${formatMinutes(settings.closeMinute)}`;
  }
  if (reason === 'paused') {
    return 'Ordering is paused right now';
  }
  const day = nextOpenDay(date, settings);
  if (!day) {
    return 'Ordering is closed';
  }
  return `Ordering closed · opens ${day === 'today' ? '' : `${day} `}at ${formatMinutes(settings.openMinute)}`;
};

// Message when someone tries to order while closed
export const closedMessage = (date = now(), settings = current) => {
  if (closedReason(date, settings) === 'paused') {
    return 'Ordering is paused by the kitchen right now. Please try again later.';
  }
  return `Orders are closed right now. ${statusLine(date, settings).replace('Ordering closed · ', '').replace(/^opens/, 'We open')}.`;
};
