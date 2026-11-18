// import React from 'react';
// import MainNavigator from './src/navigators/MainNavigator';
// import { Provider } from 'react-redux';
// import Store from './src/store/store'

// const App = () => {
//   return (
//     <Provider store={Store}>
//     <MainNavigator/>
//     </Provider>
//   );
// };

// export default App;


import React,{ useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/navigation';
import {persistor,store} from './src/redux'
import SplashScreen from './src/screens/SplashScreen';
import {View,StyleSheet,StatusBar,Animated} from 'react-native';
import Loader from './src/components/Loader';
import AccountWatcher from './src/components/Sections/AccountWatcher';
import OrderStatusWatcher from './src/components/Sections/OrderStatusWatcher';
import { startServerTimeSync } from './src/utils/serverTime';
import { startServiceSettingsSync } from './src/utils/serviceSettings';
import { ThemeProvider, useTheme } from './src/theme';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import actionTypes from './src/redux/actions/ActionTypes';

// 'Please wait' is saved with the rest of the app state; never bring a stuck one back on start
const clearStaleLoader = () => store.dispatch({ type: actionTypes.CLOSE_LOADING });


const App = () => {
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // Keep the order-hours clock in step with the server, not the phone's own clock
  useEffect(() => startServerTimeSync(), []);
  // Ordering hours / days / pause set by the owner, live for everyone
  useEffect(() => startServiceSettingsSync(), []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={clearStaleLoader}>
        {/* screen-edge sizes measured once for the whole app, so headers don't jump when the
            light/dark switch rebuilds the screens */}
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ThemeProvider>
            <ThemedRoot isLoad={isLoad} />
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

// Everything under the light / dark theme the signed-in user picked
const ThemedRoot = ({ isLoad }) => {
  const { colors, isDark } = useTheme();
  // Light/dark switch: the screens are rebuilt in the new colours underneath a cover of the new
  // background, which then fades away, so the rebuild (header jump) is never seen.
  const cover = useRef(new Animated.Value(0)).current;
  const shownDark = useRef(isDark);
  if (shownDark.current !== isDark) {
    // raise the cover in the same frame the new colours are drawn
    shownDark.current = isDark;
    cover.setValue(1);
  }
  useEffect(() => {
    Animated.timing(cover, { toValue: 0, duration: 350, delay: 250, useNativeDriver: true }).start();
  }, [isDark]);
  return (
    <View style={styles.container}>
    {/* keyed by light/dark: switching re-mounts the screens so every style picks up the new colours */}
    <View key={isDark ? 'dark' : 'light'} style={[styles.container, { backgroundColor: colors.background }]}>
      {/* status bar matches the themed headers */}
      <StatusBar barStyle="light-content" backgroundColor={colors.headerFrom} />
      <Navigation/>
      <AccountWatcher/>
      <OrderStatusWatcher/>
      {/* rendered last so it sits above the navigation while the app loads */}
      {isLoad  ? <SplashScreen/> :  null}
    </View>
    {/* Loader is a Modal (always on top), so keep it hidden behind the splash. It sits outside the
        light/dark re-mount so an open "Please wait" is never left orphaned on screen. */}
    {!isLoad && <Loader/>}
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: colors.background, opacity: cover }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
