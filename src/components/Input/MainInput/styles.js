import { themed } from '../../../theme';
import {fonts} from '../../../assets/fonts';
import ThemeColors from '../../../utils/ThemeColors';
import { vh,vw } from '../../../utils/Units';

const {StyleSheet} = require('react-native');

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
  fieldContainer: {
    // width: 80 * vw,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: c.border,
    alignItems: 'center',

    backgroundColor: c.background,
    paddingHorizontal: 4 * vw,
    borderRadius: 12,
    height: 6 * vh,

  },
  leftIcon: {
    height: 2.4 * vh,
    width: 2.4 * vh,
    resizeMode: 'contain',
    marginRight: 3 * vw,
  },
  field: {
    fontFamily: fonts.Poppins.light,
    flex: 1,
    padding: 0,
    margin: 0,
    color: c.text,
    backgroundColor: 'transparent'
  },
});
export default themed(makeStyles);
