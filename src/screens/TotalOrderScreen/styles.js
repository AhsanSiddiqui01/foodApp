import { vh, vw } from "../../utils/Units";

const { StyleSheet } = require("react-native");
const { default: ThemeColors } = require("../../utils/ThemeColors");

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        
      },
      item: {
        width: '50%',
      },
      headingStyle:{
        width: '50%',
       
      },
      quantityCenter:{
        width: '50%',
        top: 0,
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      listHeading:{
         fontSize:16,
         textAlign:'center',
         fontWeight:'700',
         color:ThemeColors.white,
         margin:5,
         padding:4,
         backgroundColor:ThemeColors.darkBlue,
       
         
      },
    mainContainer: {
        elevation: 2,
        padding: 3 * vw,
        backgroundColor: 'white',
        marginTop: 2 * vh,
        marginBottom: 1 * vh,
     
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,

    },
    itemName:{  
        fontWeight:'700',
        color:'black',
        textAlign:'center'
    },
    itemQuantity:{  
        fontWeight:'700',
        color:'black',
        fontSize:18
    },
    imgContainer: {
      height: 20 * vw, width:  '100%', borderRadius: 1 * vw,
      backgroundColor:ThemeColors.darkBlue
  },
  backArrow:{
    top: '-11%', 
    left: 10,
    position:'absolute',
    zIndex:99999,
    // backgroundColor:ThemeColors.darkBlue,
    padding:15,
    borderRadius:25,
  },
  backArrowSize:
  {
    width:15,
    height:15
  },

})
export default styles;