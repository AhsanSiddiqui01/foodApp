import { vh, vw } from "../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

const styles = StyleSheet.create({
    container: {
        // width: 42 * vw,
        flex:1,
        // elevation: 10,
    },
    imgContainer: {
        // height: 30 * vw, 
        // width: 60 * vw, 
        // borderRadius: 1 * vw,
        marginLeft:20,
        paddingRight:10,
        // borderRadius:31,
        overflow:"hidden",
    },
    image:{
        width:'100%',
        height:140,
        // aspectRatio:1
    },
    // container2: {
    //     marginTop: 2 * vh, marginLeft: 3 * vw, width: 70 * vw,
    // },
    // circularBoardStyle: {
    //     color: ThemeColors.fontBlack,
    //     fontSize: 4 * vw,
    //     marginLeft:1*vw,
    //     fontWeight:"bold"
    // },
    // heading: {
    //     color: ThemeColors.backgroundBlack,
    //     fontSize: 2.3 * vw,
    //     marginBottom: 0.5 * vh,
    //     fontWeight:"bold"
    // }

})
export default styles;