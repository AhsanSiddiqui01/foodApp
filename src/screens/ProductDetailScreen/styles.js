const {StyleSheet} = require('react-native')
import ThemeColors from '../../utils/ThemeColors';
import { fonts } from '../../assets/fonts';
import {vh, vw} from '../../utils/Units';

const BLUE = '#1458C4';
const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      backgroundColor:'white',
    },
    scrollContent:{
      paddingBottom: 14 * vh,
    },
    TopImage:{
      height: 38 * vh,
      width:'100%',
    },
    sheet:{
      marginTop: -4 * vh,
      backgroundColor:'white',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 6 * vw,
      paddingTop: 3 * vh,
    },
    titleRow:{
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'space-between',
    },
    titleInfo:{
      flex:1,
      marginRight: 3 * vw,
    },
    name:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.8 * vh,
      color: ThemeColors.backgroundBlack,
    },
    shop:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.7 * vh,
      color: ThemeColors.fontLightGrey,
    },
    price:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.6 * vh,
      color: ThemeColors.orderButton,
    },
    description:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.7 * vh,
      color: ThemeColors.fontDarkGrey,
      marginTop: 1.5 * vh,
      lineHeight: 2.6 * vh,
    },
    sectionTitle:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2 * vh,
      color: ThemeColors.backgroundBlack,
    },
    qtyRow:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginTop: 3 * vh,
    },
    stepper:{
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#F5F7FB',
      borderRadius: 24,
      padding: 4,
    },
    stepperBtn:{
      height: 9 * vw,
      width: 9 * vw,
      borderRadius: 4.5 * vw,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
      elevation: 2,
    },
    stepperBtnPrimary:{
      backgroundColor: BLUE,
    },
    stepperBtnText:{
      fontSize: 2.4 * vh,
      color: BLUE,
      lineHeight: 2.8 * vh,
    },
    stepperBtnTextPrimary:{
      color:'white',
    },
    qtyText:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.1 * vh,
      color: ThemeColors.backgroundBlack,
      minWidth: 10 * vw,
      textAlign:'center',
    },
    extrasTitle:{
      marginTop: 3 * vh,
      marginBottom: 1.5 * vh,
    },
    extrasRow:{
      paddingRight: 6 * vw,
      paddingBottom: 1 * vh,
    },
    extraCard:{
      width: 26 * vw,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: '#E3E8F0',
      backgroundColor: 'white',
      padding: 2 * vw,
      marginRight: 3 * vw,
      alignItems:'center',
    },
    extraCardSelected:{
      borderColor: BLUE,
      backgroundColor: '#E8F0FD',
    },
    extraImage:{
      width: 18 * vw,
      height: 18 * vw,
      borderRadius: 9 * vw,
    },
    extraName:{
      fontFamily: fonts.Poppins.medium,
      fontSize: 1.6 * vh,
      color: ThemeColors.backgroundBlack,
      marginTop: 0.8 * vh,
    },
    extraPrice:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.4 * vh,
      color: ThemeColors.fontLightGrey,
    },
    extraCheck:{
      position:'absolute',
      top: 1.5 * vw,
      right: 1.5 * vw,
      height: 5.5 * vw,
      width: 5.5 * vw,
      borderRadius: 2.75 * vw,
      backgroundColor: '#E3E8F0',
      alignItems:'center',
      justifyContent:'center',
    },
    extraCheckSelected:{
      backgroundColor: BLUE,
    },
    extraCheckText:{
      color:'white',
      fontSize: 1.5 * vh,
      fontWeight:'700',
    },
    moreDetail:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.7 * vh,
      minHeight: 10 * vh,
      textAlignVertical:'top',
      color: ThemeColors.fontBlack,
      backgroundColor:'#F5F7FB',
      borderWidth: 1,
      borderColor: '#E3E8F0',
      borderRadius: 12,
      paddingHorizontal: 4 * vw,
      paddingVertical: 1.5 * vh,
    },
    totalRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop: 3 * vh,
      paddingTop: 2 * vh,
      borderTopWidth: 1,
      borderTopColor: '#EEF1F6',
    },
    totalLabel:{
      fontFamily: fonts.Poppins.medium,
      fontSize: 2 * vh,
      color: ThemeColors.fontDarkGrey,
    },
    totalValue:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.6 * vh,
      color: ThemeColors.backgroundBlack,
    },
    buttonRow:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop: 2 * vh,
    },
    actionBtn:{
      width: 42 * vw,
      height: 6.5 * vh,
      borderRadius: 14,
      alignItems:'center',
      justifyContent:'center',
    },
    cartBtn:{
      borderWidth: 1.5,
      borderColor: BLUE,
      backgroundColor:'white',
    },
    orderBtn:{
      backgroundColor: ThemeColors.orderButton,
      elevation: 4,
    },
    actionBtnText:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 1.9 * vh,
      color:'white',
    },
    cartBtnText:{
      color: BLUE,
    },
    backArrow:{
      top: 2 * vh,
      left: 5 * vw,
      position:'absolute',
      zIndex:99999,
      backgroundColor:'white',
      height: 11 * vw,
      width: 11 * vw,
      borderRadius: 5.5 * vw,
      alignItems:'center',
      justifyContent:'center',
      elevation: 6,
    },
    backArrowSize:
    {
      width:15,
      height:15,
      tintColor: ThemeColors.backgroundBlack,
    }
  })
  export default styles
