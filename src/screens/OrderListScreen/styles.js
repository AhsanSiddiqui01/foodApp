import { vh,vw } from "../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

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
        alignSelf:'center',
      },
      searhBar:{
        // height: 9 * vh,
        // width: 90 * vw,
        borderRadius: 2 * vw,
        backgroundColor: ThemeColors.darkBlue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5 * vw,
        alignItems: 'center',
        shadowColor: "#000",
        marginBottom:5,
        paddingTop:10,
        paddingBottom:10,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,


        marginTop: 2 * vh
},
container: {
    // flex: 1,
    // backgroundColor: ThemeColors.white,
    justifyContent:'center',alignItems:'center',
    marginBottom:35,
  },
  inputField: {
    // marginTop: 0 * vh,
    // width: 80 * vw,
    // height: 5 * vh,
    // borderWidth: 0*vw,
    backgroundColor: 'white',
    // flexDirection: 'row',
    // alignItems: 'center',
    // alignSelf:'center'
  },
  emptyList:{
    height:'90%',
    width:'100%',
    alignContent:'center',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
})
export default styles;