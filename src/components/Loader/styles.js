import { StyleSheet } from 'react-native'
import ThemeColors from '../../utils/ThemeColors';
// import { Fonts } from '../../assets/fonts';



import { vh,vw } from './../../utils/Units';
// import {vw} from './../../utils/Units'
export default styles = StyleSheet.create({
 
        modalTouchable:{
            backgroundColor: "rgba(0,0,0,.5)", 
            alignItems: 'center', 
            justifyContent: 'center',
            flex:1,
            height:vh*100,
            width:vw*100
            
        },
        modalContainer:{
           width:"100%",
            backgroundColor: 'white', 
            borderRadius: 3 * vw,  
            paddingTop:vh*2,
            paddingBottom:vh*4,
            alignItems:"center",
            paddingHorizontal:vw*8
           

        },
        check:{width:vw*15,height:vh*5,marginBottom:vh*1},
        title:{fontSize:vw*5,marginVertical:vh*1},
        Message:{fontSize:vw*4.3,textAlign:"center",color:"#333333",marginTop:vh*1.5},
        redirect:{fontSize:vw*3.5,marginTop:vh*3},
        login:{fontSize:vw*3.5,textDecorationLine:"underline",color:"#00AF41"},
        BtnContainer:{marginTop:vh*3,width:"50%"},
        cross:{width:vw*3,height:vh*2},
        imageBg:{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              // height: 30*vh,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            borderRadius: vw * 2,
            elevation: 7, width: vw * 70, backgroundColor: "white",

            // paddingBottom:vh*3,
             minHeight:vh*12,
             alignItems:"center",
             justifyContent:"center"  

          },
          crossContainer:{
            alignItems:"flex-end",
            alignSelf:"flex-end",
            paddingTop:vh*1.5,
            paddingRight:vw*3
          },
          backArrow:{
            width:40,
            height:40,
            // top: -26, 
            // left: 15,
            // position:'absolute',
            // zIndex:99999,
            // backgroundColor:ThemeColors.borderGrey,
            // padding:15,
            // borderRadius:25,
          },
          smartIcon:{
            width:20,
            height:20,
          },

          container:{alignItems:"center",justifyContent:"center",flexDirection:"row"},
          checkMark:{width:vw*10,height:vh*5,marginBottom:vh*1},
          text:{fontSize:vh*2.2,textAlign:"center",color:"#333333",marginLeft:2*vw},
          btnsContainer:{flexDirection:"row",justifyContent:"space-between",marginTop:vh*3,width:"80%"},
          yesBtn:{backgroundColor:"#92278F",width:"44%",height:vh*5.4},
          noBtn:{width:"44%",backgroundColor:"#FFFFFF",color:"#92278F",borderWidth:vw*.3,borderColor:"#92278F",height:vh*5.4},
          request:{backgroundColor:"#92278F",width:"35%",marginTop:vh*2,height:vh*5}
      
})