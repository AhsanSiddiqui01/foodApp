import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { useTheme } from '../theme';

// Compact header in the app's blue theme (a deeper blue in dark mode)
const headerBackground = (props) => <HeaderGradient {...props} />;

const HeaderGradient = (props) => {
    const { colors } = useTheme();
    return(
        <LinearGradient colors={[colors.headerFrom, colors.headerTo]} style={[styles.headerBackground, props.style]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}/>
    )
}
export default headerBackground;
