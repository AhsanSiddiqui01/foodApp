import { themed } from '../../../theme';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../../utils/Units';
import { fonts } from '../../../assets/fonts';
import ThemeColors from '../../../utils/ThemeColors';

export const SLIDE_WIDTH = 92 * vw;
export const SLIDE_GAP = 3 * vw;

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    marginTop: 2 * vh,
  },
  listContent: {
    paddingHorizontal: 4 * vw,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: 22 * vh,
    marginRight: SLIDE_GAP,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: c.primarySoft,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
  },
  tag: {
    position: 'absolute',
    top: 1.6 * vh,
    left: 4 * vw,
    backgroundColor: c.accent,
    borderRadius: 20,
    paddingHorizontal: 3 * vw,
    paddingVertical: 0.5 * vh,
  },
  tagText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.4 * vh,
    color: c.onPrimary,
  },
  caption: {
    position: 'absolute',
    left: 4 * vw,
    right: 4 * vw,
    bottom: 1.8 * vh,
  },
  title: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 2.6 * vh,
    color: c.onPrimary,
  },
  line: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 1.6 * vh,
    color: 'rgba(255,255,255,0.85)',
  },
  pricePill: {
    alignSelf: 'flex-start',
    backgroundColor: c.card,
    borderRadius: 20,
    paddingHorizontal: 3 * vw,
    paddingVertical: 0.5 * vh,
    marginTop: 1 * vh,
  },
  priceText: {
    fontFamily: fonts.Poppins.semiBold,
    fontSize: 1.4 * vh,
    color: c.accent,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 1.2 * vh,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: c.border,
    marginHorizontal: 3,
  },
  dotActive: {
    width: 18,
    backgroundColor: c.primary,
  },
});

export default themed(makeStyles);
