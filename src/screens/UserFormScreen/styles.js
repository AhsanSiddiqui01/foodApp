import { themed } from '../../theme';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../utils/Units';
import { fonts } from '../../assets/fonts';
import ThemeColors from '../../utils/ThemeColors';

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    flex: 1,
    backgroundColor: c.background,
  },
  content: {
    paddingHorizontal: 5 * vw,
    paddingTop: 1 * vh,
    paddingBottom: 16 * vh,
  },
  label: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.7 * vh,
    color: c.text,
    marginTop: 2.2 * vh,
    marginBottom: 0.8 * vh,
  },
  input: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.8 * vh,
    color: c.text,
    backgroundColor: c.card,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 12,
    paddingHorizontal: 4 * vw,
    paddingVertical: 1.2 * vh,
  },
  inputLocked: {
    backgroundColor: c.divider,
    color: c.textMuted,
  },
  resetButton: {
    height: 6.2 * vh,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: c.primary,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
  resetText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.7 * vh,
    color: c.primary,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  showButton: {
    position: 'absolute',
    right: 3 * vw,
    paddingVertical: 1 * vh,
    paddingHorizontal: 2 * vw,
  },
  showText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.5 * vh,
    color: c.primary,
  },
  hint: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.45 * vh,
    color: c.textMuted,
    marginTop: 0.6 * vh,
  },
  roles: {
    flexDirection: 'row',
  },
  roleChip: {
    borderRadius: 22,
    paddingHorizontal: 5 * vw,
    paddingVertical: 1 * vh,
    marginRight: 2.5 * vw,
  },
  roleText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.6 * vh,
  },
  adminList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  adminChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.card,
    borderWidth: 1.2,
    borderColor: c.border,
    borderRadius: 22,
    paddingLeft: 1.2 * vw,
    paddingRight: 3.5 * vw,
    paddingVertical: 0.6 * vh,
    marginRight: 2 * vw,
    marginBottom: 1 * vh,
    maxWidth: 44 * vw,
  },
  adminChipActive: {
    borderColor: c.warning,
    backgroundColor: c.warningSoft,
  },
  adminDot: {
    width: 7 * vw,
    height: 7 * vw,
    borderRadius: 3.5 * vw,
    backgroundColor: c.divider,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2 * vw,
  },
  adminDotActive: {
    backgroundColor: c.warning,
  },
  adminDotText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.5 * vh,
    color: c.textSecondary,
  },
  adminDotTextActive: {
    color: c.onPrimary,
  },
  adminName: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.6 * vh,
    color: c.textSecondary,
    flexShrink: 1,
  },
  adminNameActive: {
    color: c.warning,
  },
  saveButton: {
    marginTop: 4 * vh,
    height: 7 * vh,
    borderRadius: 16,
    backgroundColor: c.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: c.textMuted,
  },
  saveText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2 * vh,
    color: c.onPrimary,
  },
});

export default themed(makeStyles);
