import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    mainContainer: {
        width: 92 * vw,
        elevation: 10,
        padding: 3 * vw,
        flexDirection:'row',
        backgroundColor: ThemeColors.darkBlue,
        marginHorizontal: 4 * vw,
        marginTop: 2 * vh,
        marginBottom: 1 * vh,
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
        height: 75, width: 75, borderRadius: 1 * vw
    },
    container2: {
        marginTop: 2 * vh, marginLeft: 3 * vw, width: 70 * vw,
    },
    circularBoardStyle: {
        color: ThemeColors.white,
        fontSize: 4 * vw,
        marginLeft:1*vw,
        fontWeight:"bold"
    },
    heading: {
        color: ThemeColors.backgroundBlack,
        fontSize: 2.3 * vw,
        marginBottom: 0.5 * vh,
        fontWeight:"bold"
    },
    name:{
        fontSize:12,
        fontWeight:'700',
        color:ThemeColors.white,
        marginLeft:10,
        width:125,
        flexDirection:'row'
    },

})
export default styles;