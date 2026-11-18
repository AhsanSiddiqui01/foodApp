import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { useTheme } from '../theme';

// Remembered so switching light/dark (which re-mounts the app) returns the user to the same screen
let savedNavState;

const Navigation = () => {
    const { isDark, colors } = useTheme();
    // Screen backgrounds behind cards / transitions follow the app theme
    const base = isDark ? DarkTheme : DefaultTheme;
    const navTheme = {
        ...base,
        colors: { ...base.colors, background: colors.background, card: colors.card, text: colors.text, border: colors.border, primary: colors.primary },
    };
    return (
        <NavigationContainer theme={navTheme} initialState={savedNavState} onStateChange={(state) => { savedNavState = state; }}>
            <MainNavigator/>
        </NavigationContainer>
    );
}
export default Navigation
