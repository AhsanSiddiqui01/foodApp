import { vh, vw } from "../../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../../utils/ThemeColors");

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        marginBottom:55,
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
        alignItems:'center'
      }

})
export default styles;