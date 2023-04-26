import React, {useRef,useEffect} from "react";
import { ImageBackground,Animated,Image } from "react-native";
import LogoRemove from '../../assets/logo2.png'

const SplashScreen = () => {
    const fadeAnimation = useRef(new Animated.Value(0)).current
    useEffect(()=>{
        Animated.timing(
            fadeAnimation,
            {
                toValue:1,
                duration:1000,
                useNativeDriver: true // Add This line
            }
        ).start();
    },[fadeAnimation])

    return(
        <ImageBackground
        resizeMode='cover'
        style={{height:'100%',width:'100%'}}
        imageStyle={{ opacity: 0.6 }}
        >
        <Animated.View style={{justifyContent:'center',alignItems:'center',height:'100%',width:'100%',opacity:fadeAnimation,backgroundColor:'white'}}>
            <Image source={LogoRemove} style={{width:400,marginTop:0}}/>
        </Animated.View>
        </ImageBackground>
    )
} 
export default SplashScreen