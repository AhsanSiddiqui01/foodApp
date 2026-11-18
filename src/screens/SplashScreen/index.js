import React, {useRef,useEffect} from "react";
import { themed } from '../../theme';
import { Animated, StyleSheet, View } from "react-native";
import { TitleImages } from '../../assets/images';
import { fonts } from '../../assets/fonts';
import { vh, vw } from '../../utils/Units';

const SplashScreen = () => {
    const fadeAnimation = useRef(new Animated.Value(0)).current
    const slideAnimation = useRef(new Animated.Value(3 * vh)).current
    useEffect(()=>{
        Animated.parallel([
            Animated.timing(fadeAnimation, { toValue:1, duration:900, useNativeDriver: true }),
            Animated.timing(slideAnimation, { toValue:0, duration:900, useNativeDriver: true }),
        ]).start();
    },[fadeAnimation, slideAnimation])

    return(
        <View style={styles.container}>
            <Animated.View style={[styles.content, {opacity:fadeAnimation, transform:[{translateY:slideAnimation}]}]}>
                <Animated.Image source={TitleImages.Logo} style={styles.illustration}/>
                <Animated.Text style={styles.brand}>foody</Animated.Text>
                <Animated.Text style={styles.tagline}>LUNCH. REIMAGINED</Animated.Text>
            </Animated.View>
        </View>
    )
}

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c, isDark) => ({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        elevation: 30,
        backgroundColor: c.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    illustration: {
        // login_illustration.png is 490x420
        width: 80 * vw,
        height: 80 * vw * (420 / 490),
        resizeMode: 'contain',
    },
    brand: {
        fontFamily: fonts.circular.bold,
        fontSize: 6 * vh,
        color: c.text,
        marginTop: 3 * vh,
    },
    tagline: {
        fontFamily: fonts.Poppins.medium,
        fontSize: 1.6 * vh,
        letterSpacing: 4,
        color: c.primary,
        marginTop: 0.5 * vh,
    },
});
export default SplashScreen

// live light/dark styles (see src/theme)
const styles = themed(makeStyles);
