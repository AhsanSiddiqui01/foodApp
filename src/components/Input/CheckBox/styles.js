import {fonts} from '../../../assets/fonts';
import ThemeColors from '../../../utils/ThemeColors';
import { vh,vw } from '../../../utils/Units';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
    incrementBtn:{
        marginLeft:8,
        marginRight:8,
        width:30,
        height:25,
        alignSelf:'center',
        backgroundColor:ThemeColors.incrementBtn,
      },
      decrementBtn:{
        marginLeft:8,
        width:30,
        height:25,
        alignSelf:'center',
        backgroundColor:ThemeColors.decrementBtn
      },
      qtyContainer:{
        fontSize:18,
        fontWeight:'700',
        flexDirection:'row',
        // width:200,
        marginTop:6,
        flexDirection:'row'
        // padding:20
      },
});
export default styles;
