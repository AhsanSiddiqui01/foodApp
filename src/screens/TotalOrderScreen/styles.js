import { themed } from '../../theme';
import { vh, vw } from "../../utils/Units";
import { fonts } from "../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
    screen: {
        flex: 1,
        backgroundColor: c.background,
    },
    listContent: {
        paddingTop: 2 * vh,
        paddingBottom: 12 * vh,
    },
    hero: {
        width: 92 * vw,
        alignSelf: 'center',
        backgroundColor: c.primary,
        borderRadius: 20,
        padding: 5 * vw,
        marginBottom: 2.5 * vh,
        elevation: 6,
        shadowColor: c.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    heroLabel: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.2 * vh,
        color: c.onPrimary,
    },
    heroDate: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.5 * vh,
        color: '#C3D6F7',
        marginTop: 0.3 * vh,
    },
    heroStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2.5 * vh,
    },
    heroStat: {
        flex: 1,
        alignItems: 'center',
    },
    heroDivider: {
        width: 1,
        height: 5 * vh,
        backgroundColor: 'rgba(255,255,255,0.25)',
    },
    heroValue: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.6 * vh,
        color: c.onPrimary,
    },
    heroStatLabel: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: '#C3D6F7',
    },
    dishCard: {
        width: 92 * vw,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: c.card,
        borderRadius: 16,
        padding: 3 * vw,
        marginBottom: 1.5 * vh,
        elevation: 2,
        shadowColor: c.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    rank: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.6 * vh,
        color: c.textMuted,
        width: 6 * vw,
        textAlign: 'center',
    },
    dishImage: {
        width: 14 * vw,
        height: 14 * vw,
        borderRadius: 12,
        marginLeft: 1 * vw,
    },
    dishInfo: {
        flex: 1,
        marginHorizontal: 3 * vw,
    },
    dishName: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.8 * vh,
        color: c.text,
    },
    dishPrice: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: c.textMuted,
    },
    barTrack: {
        height: 6,
        borderRadius: 3,
        backgroundColor: c.divider,
        marginTop: 0.8 * vh,
        overflow: 'hidden',
    },
    barFill: {
        height: 6,
        borderRadius: 3,
        backgroundColor: c.accent,
    },
    dishQty: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.6 * vh,
        color: c.primary,
        minWidth: 12 * vw,
        textAlign: 'right',
    },
    emptyView: {
        marginTop: 4 * vh,
        alignItems: 'center',
    },
    emptyIcon: {
        width: 30 * vw,
        height: 30 * vw,
        resizeMode: 'contain',
    },
    emptyTitle: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2.2 * vh,
        color: c.text,
        marginTop: 2 * vh,
    },
    emptyText: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.7 * vh,
        color: c.textMuted,
        marginTop: 0.5 * vh,
    },
})
export default themed(makeStyles);
