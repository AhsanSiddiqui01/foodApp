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
    paddingTop: 2 * vh,
    paddingBottom: 16 * vh,
  },
  preview: {
    width: '100%',
    height: 22 * vh,
    borderRadius: 18,
    backgroundColor: c.primarySoft,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    backgroundColor: 'rgba(21,34,43,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadingText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.7 * vh,
    color: c.onPrimary,
    marginTop: 1 * vh,
  },
  previewEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#9DBBEF',
  },
  previewIcon: {
    width: 10 * vw,
    height: 10 * vw,
    resizeMode: 'contain',
    tintColor: c.primary,
  },
  previewText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.7 * vh,
    color: c.primary,
    marginTop: 0.8 * vh,
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
  multiline: {
    minHeight: 10 * vh,
    textAlignVertical: 'top',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 4 * vw,
    paddingVertical: 0.9 * vh,
    marginRight: 2.5 * vw,
    marginBottom: 1.2 * vh,
  },
  chipEmoji: {
    fontSize: 1.8 * vh,
    marginRight: 1.5 * vw,
  },
  chipText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.6 * vh,
  },
  galleryButton: {
    height: 6.5 * vh,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: c.primary,
    backgroundColor: c.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.8 * vh,
    color: c.primary,
  },
  subLabel: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.5 * vh,
    color: c.textMuted,
    marginTop: 1.8 * vh,
    marginBottom: 0.8 * vh,
  },
  photoRow: {
    paddingBottom: 1.2 * vh,
  },
  photo: {
    width: 18 * vw,
    height: 18 * vw,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: 'transparent',
    marginRight: 2.5 * vw,
    overflow: 'hidden',
  },
  photoSelected: {
    borderColor: c.primary,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    marginTop: 3.5 * vh,
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
