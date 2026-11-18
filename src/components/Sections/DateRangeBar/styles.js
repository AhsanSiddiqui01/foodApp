import { themed } from '../../../theme';
import { StyleSheet } from 'react-native';
import { fonts } from '../../../assets/fonts';

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  row: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: c.card,
    borderWidth: 1,
    borderColor: c.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  chipText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 13,
    color: c.textSecondary,
  },
  chipTextActive: {
    color: c.onPrimary,
  },
  overlay: {
    flex: 1,
    backgroundColor: c.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  calendar: {
    width: '100%',
    backgroundColor: c.card,
    borderRadius: 22,
    padding: 18,
    elevation: 12,
  },
  calendarTitle: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 18,
    color: c.text,
  },
  calendarHint: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 13,
    color: c.textSecondary,
    marginTop: 2,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 6,
  },
  monthArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthArrowDisabled: {
    opacity: 0.35,
  },
  monthArrowText: {
    fontSize: 22,
    lineHeight: 26,
    color: c.primary,
  },
  monthName: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: c.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekday: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontFamily: fonts.Poppins.medium,
    fontSize: 12,
    color: c.textMuted,
    paddingVertical: 6,
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellInRange: {
    backgroundColor: c.primarySoft,
  },
  cellEdge: {
    backgroundColor: c.primary,
    borderRadius: 100,
  },
  cellText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: c.text,
  },
  cellTextFuture: {
    color: c.border,
  },
  cellTextInRange: {
    color: c.primary,
  },
  cellTextEdge: {
    color: c.onPrimary,
    fontFamily: fonts.Poppins.semiBold,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: c.border,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: c.primary,
    marginLeft: 10,
  },
  applyDisabled: {
    backgroundColor: c.textMuted,
  },
  buttonText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: c.onPrimary,
  },
  cancelText: {
    color: c.text,
  },
});

export default themed(makeStyles);
