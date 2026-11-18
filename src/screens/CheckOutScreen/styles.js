import { vh, vw } from "../../utils/Units";
import { fonts } from "../../assets/fonts";
import ThemeColors from "../../utils/ThemeColors";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#F5F7FB',
      },
      listContent:{
        paddingTop: 2 * vh,
        paddingBottom: 12 * vh,
      },
      listTitle:{
        width: 92 * vw,
        alignSelf:'center',
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.7 * vh,
        color: ThemeColors.fontLightGrey,
        marginBottom: 1.5 * vh,
      },
      summaryCard:{
        width: 92 * vw,
        alignSelf:'center',
        backgroundColor:'white',
        borderRadius: 18,
        padding: 4 * vw,
        marginTop: 1 * vh,
        elevation: 3,
        shadowColor: '#1458C4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      summaryTitle:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2 * vh,
        color: ThemeColors.backgroundBlack,
        marginBottom: 1 * vh,
      },
      summaryRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: 0.6 * vh,
      },
      summaryLabel:{
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: ThemeColors.fontDarkGrey,
      },
      summaryValue:{
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.7 * vh,
        color: ThemeColors.backgroundBlack,
      },
      freeText:{
        color:'#2E9E5B',
      },
      totalRow:{
        marginTop: 1 * vh,
        paddingTop: 1.5 * vh,
        borderTopWidth: 1,
        borderTopColor:'#EEF1F6',
        borderStyle:'dashed',
      },
      totalLabel:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2 * vh,
        color: ThemeColors.backgroundBlack,
      },
      totalValue:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.4 * vh,
        color: ThemeColors.orderButton,
      },
      closedBanner:{
        width: 92 * vw,
        alignSelf:'center',
        backgroundColor:'#FDECEC',
        borderRadius: 12,
        paddingVertical: 1.2 * vh,
        paddingHorizontal: 4 * vw,
        marginTop: 2 * vh,
      },
      closedText:{
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.5 * vh,
        color: ThemeColors.errorRed,
        textAlign:'center',
      },
      placeOrderBtn:{
        width: 92 * vw,
        height: 7 * vh,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: 6 * vw,
        backgroundColor: ThemeColors.orderButton,
        borderRadius: 16,
        marginTop: 2 * vh,
        elevation: 5,
        shadowColor: ThemeColors.orderButton,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      placeOrderBtnDisabled:{
        backgroundColor:'#C1C0C8',
        elevation: 0,
      },
      placeOrderText:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2 * vh,
        color:'white',
      },
      placeOrderAmount:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2 * vh,
        color:'white',
      },
      noDataView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom: 10 * vh,
      },
      hungryIcon:{
        width: 40 * vw,
        height: 40 * vw,
        resizeMode:'contain',
      },
      hungryText:{
        fontFamily: fonts.Poppins.semiBold,
        color: ThemeColors.backgroundBlack,
        fontSize: 2.4 * vh,
        marginTop: 2 * vh,
      },
      emptyText:{
        fontFamily: fonts.Poppins.regular,
        color: ThemeColors.fontLightGrey,
        fontSize: 1.7 * vh,
        marginTop: 0.5 * vh,
      },
      browseBtn:{
        marginTop: 3 * vh,
        backgroundColor:'#1458C4',
        borderRadius: 14,
        paddingVertical: 1.6 * vh,
        paddingHorizontal: 10 * vw,
        elevation: 4,
      },
      browseText:{
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.8 * vh,
        color:'white',
      },
})
export default styles;
