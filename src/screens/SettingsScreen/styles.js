import { themed } from '../../theme';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/Units';
import { fonts } from '../../assets/fonts';
import ThemeColors from '../../utils/ThemeColors';

const shadow = {
  elevation: 2,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
};

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    flex: 1,
    backgroundColor: c.background,
  },
  content: {
    paddingHorizontal: 4 * vw,
    paddingTop: 2 * vh,
    paddingBottom: 14 * vh,
  },
  hero: {
    borderRadius: 22,
    padding: 5 * vw,
    overflow: 'hidden',
    elevation: 6,
  },
  heroCircle: {
    position: 'absolute',
    borderRadius: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroCircleOne: {
    width: 180,
    height: 180,
    top: -70,
    right: -50,
  },
  heroCircleTwo: {
    width: 110,
    height: 110,
    bottom: -50,
    left: -30,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 3 * vw,
    paddingVertical: 0.5 * vh,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD1D1',
    marginRight: 6,
  },
  heroDotOpen: {
    backgroundColor: '#4ADE80',
  },
  heroBadgeText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.5 * vh,
    color: c.onPrimary,
  },
  heroDay: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.6 * vh,
    color: 'rgba(255,255,255,0.85)',
  },
  heroHours: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 3.2 * vh,
    color: c.onPrimary,
    marginTop: 1.5 * vh,
  },
  heroStatus: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.6 * vh,
    color: 'rgba(255,255,255,0.9)',
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 1.8 * vh,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchInfo: {
    flex: 1,
    marginRight: 3 * vw,
  },
  switchTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.8 * vh,
    color: c.onPrimary,
  },
  switchHint: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.4 * vh,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.9 * vh,
    color: c.text,
    marginTop: 3 * vh,
    marginBottom: 1.2 * vh,
  },
  card: {
    backgroundColor: c.card,
    borderRadius: 18,
    paddingHorizontal: 4 * vw,
    ...shadow,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1.8 * vh,
  },
  timeRowBorder: {
    borderTopWidth: 1,
    borderTopColor: c.divider,
  },
  timeEmoji: {
    fontSize: 2.4 * vh,
    marginRight: 3 * vw,
  },
  timeLabel: {
    flex: 1,
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.8 * vh,
    color: c.text,
  },
  timePill: {
    backgroundColor: c.primarySoft,
    borderRadius: 12,
    paddingHorizontal: 3.5 * vw,
    paddingVertical: 0.7 * vh,
  },
  timeValue: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.8 * vh,
    color: c.primary,
  },
  chevron: {
    fontSize: 3 * vh,
    color: c.border,
    marginLeft: 2 * vw,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2 * vh,
  },
  day: {
    width: 11.2 * vw,
    height: 11.2 * vw,
    borderRadius: 5.6 * vw,
    backgroundColor: c.background,
    borderWidth: 1,
    borderColor: c.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOn: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  dayText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.35 * vh,
    color: c.textMuted,
  },
  dayTextOn: {
    color: c.onPrimary,
  },
  cardHint: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: c.textSecondary,
    paddingVertical: 1.6 * vh,
  },
  saveButton: {
    marginTop: 2.5 * vh,
    height: 6.5 * vh,
    borderRadius: 16,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  saveText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.9 * vh,
    color: c.onPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statTile: {
    width: 29 * vw,
    backgroundColor: c.card,
    borderRadius: 16,
    paddingVertical: 1.8 * vh,
    alignItems: 'center',
    ...shadow,
  },
  statEmoji: {
    fontSize: 2.6 * vh,
  },
  statValue: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.6 * vh,
    color: c.text,
    marginTop: 0.4 * vh,
  },
  statLabel: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.3 * vh,
    color: c.textMuted,
    textAlign: 'center',
  },
  noteCard: {
    marginTop: 3 * vh,
    paddingVertical: 2 * vh,
  },
  noteTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.7 * vh,
    color: c.text,
  },
  noteText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: c.textSecondary,
    marginTop: 0.6 * vh,
    lineHeight: 2.3 * vh,
  },
  version: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.4 * vh,
    color: c.textMuted,
    textAlign: 'center',
    marginTop: 2.5 * vh,
  },
});

export default themed(makeStyles);
