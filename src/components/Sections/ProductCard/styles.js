import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    container: {
        width: 42 * vw,
        elevation: 10,
// flexDirection:"row",
        // alignItems: 'center',
        padding: 3 * vw,
        backgroundColor: 'white',
        marginHorizontal: 2 * vw,
        // marginTop: 2 * vh,
        marginBottom: 2 * vh,
        borderRadius: 2 * vw,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,

    },
    imgContainer: {
        height: 30 * vw, width: 36 * vw, borderRadius: 1 * vw
    },
    container2: {
        marginTop: 2 * vh, marginLeft: 3 * vw, width: 70 * vw,
    },
    circularBoardStyle: {
        color: ThemeColors.fontBlack,
        fontSize: 4 * vw,
        marginLeft:1*vw,
        fontWeight:"bold"
    },
    heading: {
        color: ThemeColors.backgroundBlack,
        fontSize: 2.3 * vw,
        marginBottom: 0.5 * vh,
        fontWeight:"bold"
    }

})
export default styles;