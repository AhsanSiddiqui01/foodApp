import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    mainContainer1: {
        width: 92 * vw,
        elevation: 5,
        padding: 3 * vw,
        // flexDirection:'row',
        backgroundColor: 'white',
        marginHorizontal: 4 * vw,
        marginTop: 2 * vh,
        marginBottom: 1 * vh,
        // borderRadius: 2 * vw,
        // shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,

    },
    mainContainer2: {
        // width: 92 * vw,
        // elevation: 10,
        // padding: 3 * vw,
        flexDirection:'row',
        // backgroundColor: 'white',
        // marginHorizontal: 4 * vw,
        // marginTop: 2 * vh,
        // marginBottom: 1 * vh,
        // borderRadius: 2 * vw,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 5,
        //     height: 3,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 15,

    },
    orderByContainer: {
        // width: 92 * vw,
        elevation: 10,
        padding: 3 * vw,
        // flexDirection:'row',
        // alignContent:'space-between',
        // backgroundColor: 'white',
        // marginHorizontal: 4 * vw,
        marginTop: 2 * vh,
        // marginBottom: 1 * vh,
        // borderRadius: 2 * vw,
        backgroundColor:ThemeColors.darkBlue,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,

    },
    orderTexttextField:{
        // fontSize:12,
        fontWeight:'700',
        color:'white',
        // marginLeft:10,
        // width:'67%',
        // flexDirection:'row'
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
    textUserName:{
        fontSize:15,
        fontWeight:'700',
        color:'black',
        marginLeft:10,
        width:'100%',
        flexDirection:'row'
    },
    textField:{
        fontSize:12,
        fontWeight:'700',
        color:'black',
        marginLeft:10,
        width:'100%',
        flexDirection:'row'
    },
    textFieldNotes:{
        fontSize:12,
        fontWeight:'700',
        color:'black',
        marginLeft:10,
        // width:200,
        // flexDirection:'row'
    },
    textArea:
    {
        width:65 * vw,
        // backgroundColor:'red'
    },
    dateTime:{
        marginLeft:20,
        fontSize:20,
        fontWeight:"bold",
        color:'black',
      },
      inputField: {
        marginTop: 0 * vh,
        width: 80 * vw,
        height: 5 * vh,
        borderWidth: 0*vw,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        // alignSelf:'center'
      },
     

})
export default styles;