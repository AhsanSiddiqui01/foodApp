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
    padding: 20,
    alignItems: 'center',
    elevation: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: c.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    color: c.danger,
    fontWeight: '700',
  },
  title: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 18,
    color: c.text,
    marginTop: 12,
  },
  message: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 13,
    color: c.textSecondary,
    marginTop: 2,
  },
  reasons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  reason: {
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: c.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    margin: 4,
  },
  reasonSelected: {
    borderColor: c.danger,
    backgroundColor: c.dangerSoft,
  },
  reasonText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 13,
    color: c.textSecondary,
  },
  reasonTextSelected: {
    color: c.danger,
  },
  input: {
    alignSelf: 'stretch',
    fontFamily: fonts.Poppins.regular,
    fontSize: 14,
    color: c.text,
    backgroundColor: c.background,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 18,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keepButton: {
    borderWidth: 1.5,
    borderColor: c.border,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: c.danger,
    marginLeft: 10,
  },
  cancelDisabled: {
    backgroundColor: '#F1A7A9',
  },
  buttonText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 15,
    color: c.onPrimary,
  },
  keepText: {
    color: c.text,
  },
});

export default themed(makeStyles);
