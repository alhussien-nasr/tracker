import {combineReducers, configureStore} from '@reduxjs/toolkit';
import Excersise from './excersise/slice';
import Routine from './routine/slice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reducer = combineReducers({
  Excersise,
  Routine,
});
const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  version: 1,
  whitelist: ['', 'Routine'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
