import { themed } from '../../theme';
const {StyleSheet} = require('react-native')
import ThemeColors from '../../utils/ThemeColors';
import { fonts } from '../../assets/fonts';
import {vh, vw} from '../../utils/Units';

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
    mainContainer:{
      flex:1,
      backgroundColor: c.card,
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
      backgroundColor: c.card,
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
      color: c.text,
    },
    shop:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.7 * vh,
      color: c.textMuted,
    },
    price:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.6 * vh,
      color: c.accent,
    },
    description:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.7 * vh,
      color: c.textSecondary,
      marginTop: 1.5 * vh,
      lineHeight: 2.6 * vh,
    },
    sectionTitle:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2 * vh,
      color: c.text,
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
      backgroundColor: c.background,
      borderRadius: 24,
      padding: 4,
    },
    stepperBtn:{
      height: 9 * vw,
      width: 9 * vw,
      borderRadius: 4.5 * vw,
      backgroundColor: c.card,
      alignItems:'center',
      justifyContent:'center',
      elevation: 2,
    },
    stepperBtnPrimary:{
      backgroundColor: c.primary,
    },
    stepperBtnText:{
      fontSize: 2.4 * vh,
      color: c.primary,
      lineHeight: 2.8 * vh,
    },
    stepperBtnTextPrimary:{
      color: c.onPrimary,
    },
    qtyText:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.1 * vh,
      color: c.text,
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
      borderColor: c.border,
      backgroundColor: c.card,
      padding: 2 * vw,
      marginRight: 3 * vw,
      alignItems:'center',
    },
    extraCardSelected:{
      borderColor: c.primary,
      backgroundColor: c.primarySoft,
    },
    extraImage:{
      width: 18 * vw,
      height: 18 * vw,
      borderRadius: 14,
    },
    extraName:{
      fontFamily: fonts.Poppins.medium,
      fontSize: 1.6 * vh,
      color: c.text,
      marginTop: 0.8 * vh,
    },
    extraPrice:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.4 * vh,
      color: c.textMuted,
    },
    extraCheck:{
      position:'absolute',
      top: 1.5 * vw,
      right: 1.5 * vw,
      height: 5.5 * vw,
      width: 5.5 * vw,
      borderRadius: 2.75 * vw,
      backgroundColor: c.border,
      alignItems:'center',
      justifyContent:'center',
    },
    extraCheckSelected:{
      backgroundColor: c.primary,
    },
    extraCheckText:{
      color: c.onPrimary,
      fontSize: 1.5 * vh,
      fontWeight:'700',
    },
    moreDetail:{
      fontFamily: fonts.Poppins.regular,
      fontSize: 1.7 * vh,
      minHeight: 10 * vh,
      textAlignVertical:'top',
      color: c.text,
      backgroundColor: c.background,
      borderWidth: 1,
      borderColor: c.border,
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
      borderTopColor: c.divider,
    },
    totalLabel:{
      fontFamily: fonts.Poppins.medium,
      fontSize: 2 * vh,
      color: c.textSecondary,
    },
    totalValue:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 2.6 * vh,
      color: c.text,
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
      borderColor: c.primary,
      backgroundColor: c.card,
    },
    orderBtn:{
      backgroundColor: c.accent,
      elevation: 4,
    },
    actionBtnText:{
      fontFamily: fonts.Poppins.semiBold,
      fontSize: 1.9 * vh,
      color: c.onPrimary,
    },
    cartBtnText:{
      color: c.primary,
    },
    backArrow:{
      top: 2 * vh,
      left: 5 * vw,
      position:'absolute',
      zIndex:99999,
      backgroundColor: c.card,
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
      tintColor: c.text,
    }
  })
  export default themed(makeStyles);