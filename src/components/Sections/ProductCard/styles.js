import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    container: {
        width: 44 * vw,
        backgroundColor: 'white',
        marginHorizontal: 2 * vw,
        marginBottom: 2 * vh,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#1458C4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
    },
    imgContainer: {
        height: 30 * vw,
        width: '100%',
    },
    info: {
        paddingHorizontal: 3 * vw,
        paddingTop: 1.2 * vh,
        paddingBottom: 1.4 * vh,
    },
    name: {
        color: ThemeColors.backgroundBlack,
        fontSize: 3.8 * vw,
    },
    shop: {
        color: ThemeColors.fontLightGrey,
        fontSize: 2.9 * vw,
        marginTop: 0.2 * vh,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 1 * vh,
    },
    price: {
        color: ThemeColors.orderButton,
        fontSize: 4 * vw,
    },
    addButton: {
        height: 8 * vw,
        width: 8 * vw,
        borderRadius: 4 * vw,
        backgroundColor: '#1458C4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        height: 4 * vw,
        width: 4 * vw,
        resizeMode: 'contain',
    },
})
export default styles;
