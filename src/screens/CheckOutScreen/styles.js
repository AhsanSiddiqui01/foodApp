import { vh, vw } from "../../../utils/Units";
import ThemeColors from "../../utils/ThemeColors";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    mainContainer:{
        flex:1
      },
      checkOutBtn:{
        marginBottom:1,
        marginTop:10,
        width:300,
        alignSelf:'center',
        backgroundColor:'orange'
      },
      noDataView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

      },
      hungryIcon:{
        width:150,
        height:150
      },
      hungryText:{
        color:ThemeColors.darkBlue,
        fontSize:20,
        fontWeight:'bold'
      },
      emptyText:{
        color:ThemeColors.fontDarkGrey,
      },
      backArrow:{
        top: -26, 
        left: 15,
        position:'absolute',
        zIndex:99999,
        backgroundColor:ThemeColors.darkBlue,
        padding:15,
        borderRadius:25,
      },
      backArrowSize:
      {
        width:15,
        height:15
      }

})
export default styles;