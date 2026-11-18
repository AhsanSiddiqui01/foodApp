import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { lightColors, darkColors, tint } from './palettes';

export { tint };

// Light / dark, chosen by each signed-in user for themselves. Saved per user in Firestore
// (userPrefs/{uid}) and on the phone (themeMode:{uid}). Nobody else's choice ever applies, and the
// login screen (no user yet) is always light.
export const THEME_MODES = [
  { key: 'light', label: 'Light', emoji: '☀️' },
  { key: 'dark', label: 'Dark', emoji: '🌙' },
];

let lastSwitchAt = 0;
const userKey = (uid) => `themeMode:${uid}`;

const buildTheme = (mode) => {
  const isDark = mode === 'dark';
  return { mode, isDark, colors: isDark ? darkColors : lightColors };
};

export const ThemeContext = createContext({ ...buildTheme('light'), setMode: () => {} });

export const ThemeProvider = ({ children }) => {
  const uid = useSelector((state) => state.GeneralReducer.id);
  // the choice belongs to one user: { uid, mode }
  const [choice, setChoice] = useState({ uid: null, mode: 'light' });

  // When someone signs in (or a different user signs in), start from light and load only
  // THAT user's own saved choice
  useEffect(() => {
    setChoice({ uid, mode: 'light' });
    if (!uid) {
      return undefined;
    }
    let active = true;
    const apply = (saved) => {
      if (active && (saved === 'light' || saved === 'dark')) {
        setChoice({ uid, mode: saved });
      }
    };
    AsyncStorage.getItem(userKey(uid)).then(apply).catch(() => {});
    firestore().collection('userPrefs').doc(uid).get()
      .then((doc) => {
        const saved = doc.exists && doc.data().themeMode;
        apply(saved);
        if (active && saved) {
          AsyncStorage.setItem(userKey(uid), saved).catch(() => {});
        }
      })
      .catch((error) => console.log('theme load error', error));
    return () => { active = false; };
  }, [uid]);

  const setMode = (next) => {
    if (!uid) {
      return;
    }
    // a switch re-draws the whole app; ignore extra taps until it has finished
    const nowMs = Date.now();
    if (nowMs - lastSwitchAt < 2000) {
      return;
    }
    lastSwitchAt = nowMs;
    setChoice({ uid, mode: next });
    AsyncStorage.setItem(userKey(uid), next).catch(() => {});
    firestore().collection('userPrefs').doc(uid).set({ themeMode: next }, { merge: true })
      .catch((error) => console.log('theme save error', error));
  };

  // Signed out, or a choice left over from another user: plain light
  const mode = uid && choice.uid === uid ? choice.mode : 'light';
  const value = useMemo(() => ({ ...buildTheme(mode), setMode }), [mode, uid]);
  activeTheme = value;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

// Style sheets are written as `makeStyles = (colors, isDark) => ({ ... })` and built once per theme
const cache = new Map();
export const stylesFor = (factory, theme) => {
  const key = theme.isDark ? 'dark' : 'light';
  let entry = cache.get(factory);
  if (!entry) {
    entry = {};
    cache.set(factory, entry);
  }
  if (!entry[key]) {
    entry[key] = StyleSheet.create(factory(theme.colors, theme.isDark));
  }
  return entry[key];
};

export const useStyles = (factory) => stylesFor(factory, useTheme());

// The theme currently on screen. ThemeProvider updates it, and the app tree is re-mounted when
// light/dark flips, so everything reading it re-renders with the new colours.
let activeTheme = buildTheme('light');
export const getTheme = () => activeTheme;
export const themeColors = () => activeTheme.colors;

// Status / role / category pills: same hue in both themes, brighter text and a translucent tint
// background in dark mode. Wrap a list of `{ color, background }` definitions with this.
const DARK_PILL_TEXT = {
  '#1458C4': '#5B95F7',
  '#B26A00': '#F5B454',
  '#2E9E5B': '#4ADE80',
  '#666666': '#B4BFCF',
  '#E5484D': '#FF6B6F',
  '#E8590C': '#FF8A4C',
};
export const themedPills = (list) => list.map((item) => {
  const lightColor = item.color;
  const lightBackground = item.background;
  const out = { ...item };
  Object.defineProperty(out, 'color', {
    enumerable: true,
    get: () => (activeTheme.isDark ? DARK_PILL_TEXT[lightColor] || lightColor : lightColor),
  });
  Object.defineProperty(out, 'background', {
    enumerable: true,
    get: () => tint(lightColor, activeTheme.isDark, lightBackground),
  });
  return out;
});

// `export default themed(makeStyles)` gives a normal-looking `styles` object whose entries always
// come from the active theme, so components keep using `styles.card` unchanged.
export const themed = (factory) => {
  const out = {};
  Object.keys(factory(lightColors, false)).forEach((key) => {
    Object.defineProperty(out, key, {
      enumerable: true,
      get: () => stylesFor(factory, activeTheme)[key],
    });
  });
  return out;
};
