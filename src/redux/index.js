import thunk from 'redux-thunk';
import reducers from './reducers'
import { persistReducer, persistStore } from 'redux-persist';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const persistConfig = {
    key: "ecommerce",
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)