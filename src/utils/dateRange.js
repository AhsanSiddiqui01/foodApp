import { now } from './serverTime';

// Date-range helpers for order lists. Ranges are [start, end) in the phone's local time zone,
// based on the server-corrected clock.
const DAY_MS = 24 * 60 * 60 * 1000;

export const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
export const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDay = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]}`;
export const formatDayYear = (date) => `${formatDay(date)} ${date.getFullYear()}`;

export const RANGE_PRESETS = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'week', label: 'Last 7 Days' },
  { key: 'month', label: 'Last 30 Days' },
];

export const presetRange = (key) => {
  const today = startOfDay(now());
  switch (key) {
    case 'yesterday':
      return { key, start: addDays(today, -1), end: today };
    case 'week':
      return { key, start: addDays(today, -6), end: addDays(today, 1) };
    case 'month':
      return { key, start: addDays(today, -29), end: addDays(today, 1) };
    default:
      return { key: 'today', start: today, end: addDays(today, 1) };
  }
};

// Custom range from two picked days (inclusive), returned as [start, end)
export const customRange = (from, to) => {
  const [first, last] = from <= to ? [from, to] : [to, from];
  return { key: 'custom', start: startOfDay(first), end: addDays(startOfDay(last), 1) };
};

// Human label, e.g. "Today", "12 Nov – 18 Nov"
export const rangeLabel = (range) => {
  const preset = RANGE_PRESETS.find((option) => option.key === range.key);
  if (preset) {
    return preset.label;
  }
  const lastDay = new Date(range.end.getTime() - DAY_MS);
  return range.start.getTime() === startOfDay(lastDay).getTime()
    ? formatDayYear(range.start)
    : `${formatDay(range.start)} – ${formatDayYear(lastDay)}`;
};
