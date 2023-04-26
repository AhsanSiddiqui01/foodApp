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


import React,{ useState  } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/navigation';
import {persistor,store} from './src/redux'
import SplashScreen from './src/screens/SplashScreen';
import {View,StyleSheet} from 'react-native';
import Loader from './src/components/Loader';


const App = () => {
  const [isLoad, setIsLoad] = useState(true);
  setTimeout(() => {
    setIsLoad(false);
  }, 4000);
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        {isLoad  ? <SplashScreen/> :  null}
        <Loader/>
        <Navigation/>
        </PersistGate>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
