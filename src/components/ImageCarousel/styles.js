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
    bannerContainer:{
        flex:1,
        // backgroundColor:'gainsboro'
    },
    swiper:{
        width:vw*90,
        height:vh*25,
        // alignItems:'center',
        marginTop:5,
        // backgroundColor:'red'
    },
    imageBanner:{
        height:vh*25,
        width:vw*80,
        borderRadius:10,
        marginHorizontal:20
    }

})
export default styles;