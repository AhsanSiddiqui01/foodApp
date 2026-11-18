import { vh, vw } from "../../utils/Units";
import { fonts } from "../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#F5F7FB',
      },
      listContent:{
        paddingTop: 2 * vh,
        paddingBottom: 12 * vh,
      },
      emptyView:{
        marginTop: 12 * vh,
        alignItems:'center',
      },
      emptyIcon:{
        width: 32 * vw,
        height: 32 * vw,
        resizeMode:'contain',
        opacity: 0.9,
      },
      emptyTitle:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.2 * vh,
        color: ThemeColors.backgroundBlack,
        marginTop: 2 * vh,
      },
      emptyText:{
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: ThemeColors.fontLightGrey,
        marginTop: 0.5 * vh,
      },
})
export default styles;
