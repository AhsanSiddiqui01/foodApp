import { vh, vw } from "../../../utils/Units";
import { fonts } from "../../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const BLUE = '#1458C4';
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
        shadowColor: BLUE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 1.5 * vh,
        marginBottom: 0.5 * vh,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F6',
    },
    avatar: {
        width: 11 * vw,
        height: 11 * vw,
        borderRadius: 5.5 * vw,
        backgroundColor: '#E8F0FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.2 * vh,
        color: BLUE,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 3 * vw,
        marginRight: 2 * vw,
    },
    customer: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.9 * vh,
        color: ThemeColors.backgroundBlack,
    },
    meta: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: ThemeColors.fontLightGrey,
    },
    countPill: {
        backgroundColor: '#FFF1EC',
        borderRadius: 20,
        paddingHorizontal: 3 * vw,
        paddingVertical: 0.6 * vh,
    },
    countText: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.4 * vh,
        color: ThemeColors.orderButton,
    },
    itemBlock: {
        paddingVertical: 0.8 * vh,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 12 * vw,
        height: 12 * vw,
        borderRadius: 12,
    },
    itemName: {
        flex: 1,
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.8 * vh,
        color: ThemeColors.backgroundBlack,
        marginHorizontal: 3 * vw,
    },
    itemQty: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.6 * vh,
        color: BLUE,
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
    notesBox: {
        marginTop: 0.8 * vh,
        marginLeft: 15 * vw,
        backgroundColor: '#FFF8E1',
        borderLeftWidth: 3,
        borderLeftColor: '#F19C1C',
        borderRadius: 8,
        paddingHorizontal: 3 * vw,
        paddingVertical: 0.6 * vh,
    },
    notesLabel: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.5 * vh,
        color: '#B26A00',
    },
    notesText: {
        fontFamily: fonts.Poppins.regular,
        color: '#7A4A00',
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
    footerLabel: {
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
