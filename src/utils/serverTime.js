import { AppState } from 'react-native';

// Trusted clock: the phone's own clock can be changed by the user, so we measure how far it is
// from Google's servers (HTTP Date header) and correct for it. The phone's *time zone* is still
// used, so ordering hours follow each user's local time.
let offsetMs = 0;
let lastSync = 0;

const SYNC_URL = 'https://firestore.googleapis.com/';
const RESYNC_MS = 10 * 60 * 1000;

export const syncServerTime = async () => {
  try {
    const sentAt = Date.now();
    const response = await fetch(SYNC_URL, { method: 'HEAD', cache: 'no-store' });
    const header = response.headers.get('date');
    if (!header) {
      return;
    }
    const roundTrip = Date.now() - sentAt;
    // The header has 1-second precision; assume the server stamped it half way through the request
    offsetMs = new Date(header).getTime() + roundTrip / 2 - Date.now();
    lastSync = Date.now();
  } catch (error) {
    console.log('server time sync error', error);
  }
};

// Current time corrected to the server clock (local time zone still applies to getHours() etc.)
export const now = () => {
  if (Date.now() - lastSync > RESYNC_MS) {
    syncServerTime();
  }
  return new Date(Date.now() + offsetMs);
};

// Minutes east of UTC for this phone's time zone (e.g. Pakistan = 300)
export const timeZoneOffsetMinutes = () => -now().getTimezoneOffset();

// Sync once at start and whenever the app comes back to the foreground
export const startServerTimeSync = () => {
  syncServerTime();
  const subscription = AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      syncServerTime();
    }
  });
  return () => subscription.remove();
};
