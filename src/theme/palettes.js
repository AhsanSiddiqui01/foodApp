// Colour tokens for light and dark mode. Screens use these names instead of hard-coded hex values.
export const lightColors = {
  background: '#F5F7FB', // screen background
  card: '#FFFFFF', // cards, sheets, tab bar
  cardAlt: '#F5F7FB', // inputs, steppers, subtle fills inside cards
  border: '#E3E8F0',
  divider: '#EEF1F6',
  segment: '#E9EEF6', // segmented-control track
  text: '#15222B',
  textSecondary: '#666666',
  textMuted: '#959595',
  placeholder: '#9AA3B5',
  primary: '#1458C4',
  primarySoft: '#E8F0FD',
  accent: '#F75938', // prices, order buttons
  accentSoft: '#FFF1EC',
  success: '#2E9E5B',
  successSoft: '#E7F6EC',
  warning: '#B26A00',
  warningSoft: '#FFF4E0',
  danger: '#E5484D',
  dangerSoft: '#FDECEC',
  onPrimary: '#FFFFFF', // text on blue / orange / red buttons
  overlay: 'rgba(21,34,43,0.45)',
  shadow: '#1458C4',
  headerFrom: '#1458C4',
  headerTo: '#2F7BEA',
};

export const darkColors = {
  background: '#0E1520',
  card: '#182231',
  cardAlt: '#212C3D',
  border: '#2B384C',
  divider: '#243043',
  segment: '#212C3D',
  text: '#EEF2F8',
  textSecondary: '#B4BFCF',
  textMuted: '#7D8AA0',
  placeholder: '#6E7B90',
  primary: '#5B95F7',
  primarySoft: '#1D3156',
  accent: '#FF7A5C',
  accentSoft: '#3A2420',
  success: '#4ADE80',
  successSoft: '#163323',
  warning: '#F5B454',
  warningSoft: '#3A2E17',
  danger: '#FF6B6F',
  dangerSoft: '#3A1E21',
  onPrimary: '#FFFFFF',
  overlay: 'rgba(0,0,0,0.6)',
  shadow: '#000000',
  headerFrom: '#0F3E8C',
  headerTo: '#1A5BC0',
};

// Status / role / category pills keep their own colour; in dark mode their pastel backgrounds
// are swapped for a translucent tint of the same colour so they don't glare.
export const tint = (hex, isDark, lightBackground) => {
  if (!isDark) {
    return lightBackground;
  }
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},0.18)`;
};
