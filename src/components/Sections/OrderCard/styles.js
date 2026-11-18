import { vh, vw } from "../../../utils/Units";
import { fonts } from "../../../assets/fonts";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const BLUE = '#1458C4';
const styles = StyleSheet.create({
    card: {
        width: 92 * vw,
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 3 * vw,
        marginBottom: 1.5 * vh,
        elevation: 3,
        shadowColor: BLUE,
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
        color: ThemeColors.backgroundBlack,
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
        color: ThemeColors.fontLightGrey,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 2 * vh,
        color: ThemeColors.orderButton,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F7FB',
        borderRadius: 20,
        padding: 3,
    },
    stepperBtn: {
        width: 7 * vw,
        height: 7 * vw,
        borderRadius: 3.5 * vw,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    stepperBtnPrimary: {
        backgroundColor: BLUE,
    },
    stepperText: {
        fontSize: 2 * vh,
        lineHeight: 2.4 * vh,
        color: BLUE,
    },
    stepperTextPrimary: {
        color: 'white',
    },
    qty: {
        fontFamily: fonts.Poppins.semiBold,
        fontSize: 1.8 * vh,
        color: ThemeColors.backgroundBlack,
        minWidth: 8 * vw,
        textAlign: 'center',
    },
})
export default styles;
