import Measurements from "../../../utils/Measurements";
import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: ThemeColors.backgroundBlack
        backgroundColor:'#ffffff'
        // backgroundColor:'yellow'
    },
    scroll:{ 
        // flex: 1 
    },
    topBackground: {
        // height: Measurements.backgroundHeight,
        // width: Measurements.backgroundWidth,

        // height:20*vh,
        // width: 20*vw,

        // login_illustration.png is 490x420
        width: 82 * vw,
        height: 82 * vw * (420 / 490),
        resizeMode: 'contain',

top:3*vh,
        position: 'absolute',
        // top:0*vh,
        // left:0*vw,
        // right:0*vw,
        // bottom:0*vh,
        alignSelf:"center",
        // left: Measurements.backgroundLeft,
        // top: Measurements.backgroundTop,
        // opacity: 0.56,
    },
    bottomBackground:{
        height: Measurements.backgroundHeight,
        width: Measurements.backgroundWidth,
        marginLeft: Measurements.backgroundLeft,
        alignItems:'center'
    },
    bottomBackgroundImage:{

        opacity: 0.2
    },
    topOverlay: {
        // leaves room for the illustration above the login sheet
        height: 82 * vw * (420 / 490) - 3 * vh,
        backgroundColor: 'transparent',
        width: 100 * vw 
    },
    title:{
        color:ThemeColors.darkBlue,
        marginTop:0.5*vh,
        fontSize:3*vh,
        marginLeft:Measurements.marginLeft
    },
    sheetContainer:{
        width: 100 * vw, 
        minHeight: 100 * vh - (Measurements.backgroundHeight + Measurements.backgroundTop), 
        backgroundColor: 'white', 
        marginTop: 5 * vh, 
        borderTopRightRadius: 10 * vw, 
        borderTopLeftRadius: 10 * vw, 
        alignItems: 'center' ,
        elevation:10*vw
    },
    backButton:{
        position: 'absolute',
        left: 5 * vw,
        top: 10 * vw,
        backgroundColor: 'white',
        width: 8 * vw,
        height: 8 * vw,
        borderRadius: 4 * vw,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{ height: 5 * vh, width: 50 * vw, marginVertical: 5 * vh, resizeMode: 'contain' }
})
export default styles