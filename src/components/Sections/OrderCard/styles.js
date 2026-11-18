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
        flexDirection: 'row',
        backgroundColor: c.card,
        borderRadius: 18,
        padding: 3 * vw,
        marginBottom: 1.5 * vh,
        elevation: 3,
        shadowColor: c.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    image: {
        width: 22 * vw,
        height: 22 * vw,
        borderRadius: 14,
    },
    info: {
        flex: 1,
        marginLeft: 3.5 * vw,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        flex: 1,
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.9 * vh,
        color: c.text,
        marginRight: 2 * vw,
    },
    trash: {
        width: 5 * vw,
        height: 5 * vw,
        resizeMode: 'contain',
    },
    notes: {
        fontFamily: fonts.Poppins.regular,
        fontSize: 1.4 * vh,
        color: c.textMuted,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2 * vh,
        color: c.accent,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: c.background,
        borderRadius: 20,
        padding: 3,
    },
    stepperBtn: {
        width: 7 * vw,
        height: 7 * vw,
        borderRadius: 3.5 * vw,
        backgroundColor: c.card,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    stepperBtnPrimary: {
        backgroundColor: c.primary,
    },
    stepperText: {
        fontSize: 2 * vh,
        lineHeight: 2.4 * vh,
        color: c.primary,
    },
    stepperTextPrimary: {
        color: c.onPrimary,
    },
    qty: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.8 * vh,
        color: c.text,
        minWidth: 8 * vw,
        textAlign: 'center',
    },
})
export default themed(makeStyles);
