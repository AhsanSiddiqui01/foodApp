import { themed } from '../../theme';
const {StyleSheet} = require('react-native');
import ThemeColors from '../../utils/ThemeColors';
import {vh, vw} from '../../utils/Units';
import {fonts} from '../../assets/fonts';
// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  container: {
    flex: 1,
    backgroundColor: c.background,
    alignItems:'center'
  },
  listContent: {
    paddingHorizontal: 2 * vw,
    paddingBottom: 12 * vh,
  },
  inputField: {
    width: 92 * vw,
    height: 6.5 * vh,
    backgroundColor: c.card,
    borderColor: 'transparent',
    borderRadius: 14,
  },
  searhBar:{
    marginTop: 2 * vh,
    borderRadius: 14,
    backgroundColor: c.card,
    elevation: 4,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sliderWrap: {
    // cancel the list's horizontal padding so banners can span the full screen width
    marginHorizontal: -2 * vw,
  },
  chipsRow: {
    paddingHorizontal: 4 * vw,
    paddingTop: 2.2 * vh,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 4 * vw,
    paddingVertical: 1 * vh,
    marginRight: 2.5 * vw,
  },
  chipEmoji: {
    fontSize: 1.9 * vh,
    marginRight: 1.5 * vw,
  },
  chipText: {
    fontFamily: fonts.Poppins.medium,
    fontSize: 1.7 * vh,
  },
  sectionHeader: {
    width: 92 * vw,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 2.5 * vh,
    marginBottom: 1.5 * vh,
  },
  sectionTitle: {
    color: c.text,
    fontSize: 2.4 * vh,
  },
  sectionCount: {
    color: c.textMuted,
    fontSize: 1.6 * vh,
  },
});
export default themed(makeStyles);
