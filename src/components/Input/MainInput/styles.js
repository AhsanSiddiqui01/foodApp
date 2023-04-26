import {fonts} from '../../../assets/fonts';
import ThemeColors from '../../../utils/ThemeColors';
import { vh,vw } from '../../../utils/Units';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  fieldContainer: {
    // width: 80 * vw,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: ThemeColors.borderGrey,
    alignItems: 'center',
  
    backgroundColor:'white',
    paddingHorizontal: 3 * vw,
    borderRadius: 5,
    height: 5 * vh,
    
  },
  field: {
    fontFamily: fonts.Poppins.light,
    width: 66 * vw,
    padding: 0,
    margin: 0,
    color:'black',
    backgroundColor:'white'
  },
});
export default styles;
