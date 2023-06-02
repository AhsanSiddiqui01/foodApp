import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding: 3 * vw,
        elevation: 10,
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
    card: {
        flexDirection:'row',
    },
    imgContainer: {
        height: 60, width: 60, borderRadius: 1 * vw
    },
    container2: {
        // marginTop: 2 * vh,
        //  marginLeft: 3 * vw,
        //   width: 70 * vw,
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
        color:'black',
        marginLeft:10,
        width:125,
        flexDirection:'row'
    },
    noDataView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      dateTime:{
        marginLeft:20,
        marginTop:0,
      },
      orderByContainer: {
        // width: 92 * vw,
        // elevation: 10,
        padding: 3 * vw,
        // flexDirection:'row',
        alignContent:'space-between',
        backgroundColor: ThemeColors.primary,
        marginHorizontal: 4 * vw,
        marginTop: 2 * vh,
        marginBottom: 1 * vh,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,

    },
    orderTexttextField:{
        color:'white',
    },
    drinksandNotesContainer:{
        marginTop:4,
    },
    drinksandNotes:
    {
        fontSize:12,
        fontWeight:'700',
        color:ThemeColors.fontBlack,
    }

})
export default styles;