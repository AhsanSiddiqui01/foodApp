import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { fonts } from '../../../assets/fonts';
import { themed, useTheme } from '../../../theme';

// Dark-mode on/off switch. Saved for the signed-in user only, so every customer, admin and
// owner keeps their own look.
const ThemeSwitcher = ({ style }) => {
  const { isDark, setMode, colors } = useTheme();
  const toggle = () => setMode(isDark ? 'light' : 'dark');
  return (
    <TouchableOpacity style={[styles.row, style]} activeOpacity={0.8} onPress={toggle}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>Dark mode</Text>
        <Text style={styles.subtitle}>{isDark ? 'On' : 'Off'}</Text>
      </View>
      <Switch
        value={isDark}
        onValueChange={toggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </TouchableOpacity>
  );
};

// Small sun / moon button for the header, next to the avatar
export const ThemeToggleButton = () => {
  const { isDark, setMode } = useTheme();
  return (
    <TouchableOpacity
      style={styles.headerButton}
      activeOpacity={0.8}
      onPress={() => setMode(isDark ? 'light' : 'dark')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.headerIcon}>{isDark ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = (c) => ({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.cardAlt,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 17,
  },
  texts: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 14,
    color: c.text,
  },
  subtitle: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: c.textMuted,
  },
  headerButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerIcon: {
    fontSize: 17,
  },
});

const styles = themed(makeStyles);

export default ThemeSwitcher;
