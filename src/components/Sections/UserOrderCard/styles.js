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
        alignItems: 'center',
        paddingBottom: 1.5 * vh,
        marginBottom: 0.5 * vh,
        borderBottomWidth: 1,
        borderBottomColor: c.divider,
    },
    avatar: {
        width: 11 * vw,
        height: 11 * vw,
        borderRadius: 5.5 * vw,
        backgroundColor: c.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.2 * vh,
        color: c.primary,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 3 * vw,
        marginRight: 2 * vw,
    },
    customer: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.9 * vh,
        color: c.text,
    },
    meta: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: c.textMuted,
    },
    adminLine: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.35 * vh,
        color: c.warning,
        marginTop: 0.2 * vh,
    },
    adminLineMissing: {
        color: c.danger,
    },
    statusPill: {
        borderRadius: 20,
        paddingHorizontal: 3 * vw,
        paddingVertical: 0.6 * vh,
    },
    statusText: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.4 * vh,
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
        color: c.text,
        marginHorizontal: 3 * vw,
    },
    itemQty: {
        fontFamily: fonts.Poppins.semiBold,
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
    notesBox: {
        marginTop: 0.8 * vh,
        marginLeft: 15 * vw,
        backgroundColor: c.warningSoft,
        borderLeftWidth: 3,
        borderLeftColor: c.warning,
        borderRadius: 8,
        paddingHorizontal: 3 * vw,
        paddingVertical: 0.6 * vh,
    },
    notesLabel: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.5 * vh,
        color: c.warning,
    },
    notesText: {
        fontFamily: fonts.Poppins.regular,
        color: c.warning,
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
    footerLabel: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: c.textSecondary,
    },
    footerAmount: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.1 * vh,
        color: c.accent,
    },
    actionRow: {
        flexDirection: 'row',
        marginTop: 1.5 * vh,
    },
    actionBtn: {
        height: 5.8 * vh,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    actionBtnFlex: {
        flex: 1,
    },
    cancelBtn: {
        height: 5.8 * vh,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: c.danger,
        paddingHorizontal: 5 * vw,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2.5 * vw,
    },
    cancelBtnText: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.7 * vh,
        color: c.danger,
    },
    cardCancelled: {
        backgroundColor: c.card,
    },
    cancelBox: {
        backgroundColor: c.dangerSoft,
        borderLeftWidth: 3,
        borderLeftColor: c.danger,
        borderRadius: 10,
        paddingHorizontal: 3 * vw,
        paddingVertical: 1 * vh,
        marginTop: 0.5 * vh,
        marginBottom: 0.5 * vh,
    },
    cancelTitle: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.5 * vh,
        color: c.danger,
    },
    cancelReason: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.5 * vh,
        color: c.danger,
    },
    itemCancelled: {
        opacity: 0.5,
    },
    footerAmountCancelled: {
        color: c.textMuted,
        textDecorationLine: 'line-through',
    },
    actionText: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.8 * vh,
        color: c.onPrimary,
    },
})
export default themed(makeStyles);
