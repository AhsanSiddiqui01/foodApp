import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const headerBackground = (props) => {

    //old header color:'154689
    // console.log('headerBackground : ',props)
    return(
        <LinearGradient colors={['#1458C4', '#2F7BEA']} style={[{flex:1, borderBottomLeftRadius:24, borderBottomRightRadius:24},props.style]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        </LinearGradient>
    )
}
export default headerBackground;