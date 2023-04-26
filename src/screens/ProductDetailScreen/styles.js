
const {StyleSheet} = require('react-native')
import ThemeColors from '../../utils/ThemeColors';
import {vh, vw} from '../../utils/Units';
const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      marginBottom:60
    },
    field: {
      width:120,
      // flexDirection:'column',
      // alignItems:'flex-start',
      fontSize: 13,
      // height: 150,
      backgroundColor: "#FFFFFF",
      // textAlignVertical: 'top'
    },
    moreDetail:{
      fontSize: 13,
      marginTop:10,
      width: '100%',
      padding:0,
      margin: 0,
      color:ThemeColors.fontBlack,
      backgroundColor:'white',
      borderWidth: 1,
      borderColor: ThemeColors.borderGrey,
      alignItems: 'center',
      paddingHorizontal: 3 * vw,
      borderRadius: 5,
    },
    qtyContainer:{
      fontSize:18,
      fontWeight:'700',
      flexDirection:'row',
      width:200,
      marginTop:6
      // padding:20
    },
    Qtyfield: {
      width:20*vw,
      alignItems:'flex-start',
      fontSize: 13,
      backgroundColor: "#FFFFFF",
      textAlignVertical: 'top'
    },
    TopImage:{
      height:vh * 40,
      width:'100%',
    },
    contentContainer:{
      paddingHorizontal:20,
      marginTop:10
    },
    name:{
      fontSize:20,
      fontWeight:'700',
      // margin:10
    },
    otherDetail:{
      fontSize:18,
      fontWeight:'700',
      // color:'red'
      color:ThemeColors.fontDarkGrey
    },
    qtyText:{
      alignItems:'center',
      justifyContent:'center',
      color:ThemeColors.fontDarkGrey
    },
    ProductDetail:{
      fontSize:18,
      fontWeight:'400',
    },
    addToCartButton:{
      width:'100%',
      height:40,
      borderRadius:8,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:20,
      marginTop:10,
    },
    addToCartText:{
          color:'white',
          fontSize:14,
          fontWeight:'700'
    },
    addToCartBtn:{
        marginBottom:1,
        marginTop:10,
        width:300,
        alignSelf:'center',
        backgroundColor:ThemeColors.addCartBtn
      },
      incrementBtn:{
        marginLeft:8,
        marginRight:8,
        width:30,
        height:25,
        alignSelf:'center',
        backgroundColor:ThemeColors.incrementBtn,
      },
      decrementBtn:{
        marginLeft:8,
        width:30,
        height:25,
        alignSelf:'center',
        backgroundColor:ThemeColors.decrementBtn
      },
    orderNowBtn:{
      marginBottom:1,
      marginTop:10,
      width:300,
      alignSelf:'center',
      backgroundColor:ThemeColors.orderButton
      },
    backArrow:{
      top: 15, 
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
  export default styles