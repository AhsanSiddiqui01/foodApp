import {fonts} from '../../../assets/fonts';
import ThemeColors from '../../../utils/ThemeColors';
import { vh,vw } from '../../../utils/Units';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  fieldContainer: {
    // width: 80 * vw,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E3E8F0',
    alignItems: 'center',

    backgroundColor: '#F5F7FB',
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
    color: ThemeColors.fontBlack,
    backgroundColor: 'transparent'
  },
});
export default styles;
