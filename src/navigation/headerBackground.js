import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const headerBackground = (props) => {

    //old header color:'154689
    // console.log('headerBackground : ',props)
    return(
        <LinearGradient colors={['#004e92', '#457fca']} style={[{flex:1},props.style]} start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }}>
        </LinearGradient>
    )
}
export default headerBackground;