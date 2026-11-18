import { vh, vw } from "../../../utils/Units";
import { fonts } from "../../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    card: {
        width: 92 * vw,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 18,
        paddingHorizontal: 4 * vw,
        paddingTop: 2 * vh,
        paddingBottom: 1.5 * vh,
        marginBottom: 2 * vh,
        elevation: 3,
        shadowColor: '#1458C4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 1.5 * vh,
        marginBottom: 0.5 * vh,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F6',
    },
    orderNo: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.9 * vh,
        color: ThemeColors.backgroundBlack,
    },
    dateTime: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.5 * vh,
        color: ThemeColors.fontLightGrey,
        marginTop: 0.3 * vh,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7F6EC',
        borderRadius: 20,
        paddingHorizontal: 3 * vw,
        paddingVertical: 0.6 * vh,
    },
    statusDot: {
        width: 1.8 * vw,
        height: 1.8 * vw,
        borderRadius: 0.9 * vw,
        backgroundColor: '#2E9E5B',
        marginRight: 1.5 * vw,
    },
    statusText: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.4 * vh,
        color: '#2E9E5B',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 1 * vh,
    },
    itemImage: {
        width: 13 * vw,
        height: 13 * vw,
        borderRadius: 12,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 3 * vw,
        marginRight: 2 * vw,
    },
    itemName: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.8 * vh,
        color: ThemeColors.backgroundBlack,
    },
    itemNotes: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: ThemeColors.fontLightGrey,
    },
    itemQty: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.6 * vh,
        color: '#1458C4',
        backgroundColor: '#E8F0FD',
        borderRadius: 8,
        paddingHorizontal: 2 * vw,
        paddingVertical: 0.3 * vh,
        overflow: 'hidden',
        marginRight: 3 * vw,
    },
    itemPrice: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.7 * vh,
        color: ThemeColors.backgroundBlack,
        minWidth: 18 * vw,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0.5 * vh,
        paddingTop: 1.5 * vh,
        borderTopWidth: 1,
        borderTopColor: '#EEF1F6',
    },
    footerCount: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.6 * vh,
        color: ThemeColors.fontLightGrey,
    },
    footerTotal: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: ThemeColors.fontDarkGrey,
    },
    footerAmount: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.1 * vh,
        color: ThemeColors.orderButton,
    },
})
export default styles;
