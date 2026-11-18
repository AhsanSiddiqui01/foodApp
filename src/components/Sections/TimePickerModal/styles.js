import { themed } from '../../../theme';
import { StyleSheet } from 'react-native';
import { fonts } from '../../../assets/fonts';

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  overlay: {
    flex: 1,
    backgroundColor: c.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: c.card,
    borderRadius: 22,
    padding: 18,
    elevation: 12,
  },
  title: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: c.textSecondary,
    textAlign: 'center',
  },
  preview: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 34,
    color: c.primary,
    textAlign: 'center',
    marginTop: 2,
  },
  periodRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: c.segment,
    borderRadius: 14,
    padding: 4,
    marginTop: 8,
  },
  period: {
    paddingHorizontal: 26,
    paddingVertical: 7,
    borderRadius: 11,
  },
  periodActive: {
    backgroundColor: c.card,
    elevation: 2,
  },
  periodText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 14,
    color: c.textMuted,
  },
  periodTextActive: {
    color: c.primary,
  },
  label: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 13,
    color: c.text,
    marginTop: 14,
    marginBottom: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -3,
  },
  cell: {
    margin: 3,
    height: 40,
    borderRadius: 12,
    backgroundColor: c.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourCell: {
    width: '14.2%',
  },
  minuteCell: {
    width: '14.2%',
  },
  cellActive: {
    backgroundColor: c.primary,
  },
  cellText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 14,
    color: c.text,
  },
  cellTextActive: {
    color: c.onPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 18,
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
  saveButton: {
    backgroundColor: c.primary,
    marginLeft: 10,
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
