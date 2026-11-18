import { themed } from '../../../theme';
import { vh, vw } from "../../../utils/Units";
import { fonts } from "../../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
    card: {
        width: 92 * vw,
        alignSelf: 'center',
        backgroundColor: c.card,
        borderRadius: 18,
        paddingHorizontal: 4 * vw,
        paddingTop: 2 * vh,
        paddingBottom: 1.5 * vh,
        marginBottom: 2 * vh,
        elevation: 3,
        shadowColor: c.shadow,
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
        borderBottomColor: c.divider,
    },
    orderNo: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.9 * vh,
        color: c.text,
    },
    dateTime: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.5 * vh,
        color: c.textMuted,
        marginTop: 0.3 * vh,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: c.successSoft,
        borderRadius: 20,
        paddingHorizontal: 3 * vw,
        paddingVertical: 0.6 * vh,
    },
    statusDot: {
        width: 1.8 * vw,
        height: 1.8 * vw,
        borderRadius: 0.9 * vw,
        backgroundColor: c.success,
        marginRight: 1.5 * vw,
    },
    statusText: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.4 * vh,
        color: c.success,
    },
    tracker: {
        flexDirection: 'row',
        paddingTop: 0.5 * vh,
        paddingBottom: 1.2 * vh,
        marginBottom: 0.5 * vh,
        borderBottomWidth: 1,
        borderBottomColor: c.divider,
    },
    trackerStep: {
        flex: 1,
        alignItems: 'center',
    },
    trackerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    trackerLine: {
        flex: 1,
        height: 3,
        backgroundColor: c.border,
    },
    trackerLineHidden: {
        backgroundColor: 'transparent',
    },
    trackerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: c.border,
        backgroundColor: c.card,
    },
    trackerLabel: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.25 * vh,
        color: c.textMuted,
        marginTop: 0.5 * vh,
    },
    cancelBox: {
        backgroundColor: c.dangerSoft,
        borderLeftWidth: 3,
        borderLeftColor: c.danger,
        borderRadius: 10,
        paddingHorizontal: 3 * vw,
        paddingVertical: 1.1 * vh,
        marginBottom: 1 * vh,
    },
    cancelTitle: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.55 * vh,
        color: c.danger,
    },
    cancelReason: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.55 * vh,
        color: c.danger,
        marginTop: 0.2 * vh,
    },
    itemCancelled: {
        opacity: 0.5,
    },
    footerAmountCancelled: {
        color: c.textMuted,
        textDecorationLine: 'line-through',
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
        color: c.text,
    },
    itemNotes: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: c.textMuted,
    },
    itemQty: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.6 * vh,
        color: c.primary,
        backgroundColor: c.primarySoft,
        borderRadius: 8,
        paddingHorizontal: 2 * vw,
        paddingVertical: 0.3 * vh,
        overflow: 'hidden',
        marginRight: 3 * vw,
    },
    itemPrice: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.7 * vh,
        color: c.text,
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
        borderTopColor: c.divider,
    },
    footerCount: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.6 * vh,
        color: c.textMuted,
    },
    footerTotal: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: c.textSecondary,
    },
    footerAmount: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.1 * vh,
        color: c.accent,
    },
})
export default themed(makeStyles);
