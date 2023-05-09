import {fonts} from '../../../assets/fonts';
import ThemeColors from '../../../utils/ThemeColors';
import { vh,vw } from '../../../utils/Units';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  fieldContainer: {
    width: 90 * vw,
    height: 5 * vh,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: ThemeColors.darkBlue,
    alignItems: 'center',
    paddingHorizontal: 3 * vw,
    borderRadius: 2,
    margin:3,
    marginTop: 1 * vh,
    backgroundColor:ThemeColors.white,
  },
  field: {
    fontFamily: fonts.Poppins.light,
    width: 85 * vw,
    padding: 0,
    margin: 0,
    color:ThemeColors.darkBlue,
    // backgroundColor:ThemeColors.darkBlue
  },
  searhBar:{
    height: 9 * vh,
    width: 90 * vw,
    borderRadius: 2 * vw,
    // backgroundColor: ThemeColors.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5 * vw,
    alignItems: 'center',
    shadowColor: "#000",
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,

   
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    
    elevation: 10,


    marginTop: 2 * vh
},
});
export default styles;
