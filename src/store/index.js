import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../api/tmdbApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import genreOrCategory from '../api/genreCateg'

const persistConfig = {
  key:"root",
  storage,
  blacklist:['tmdbApi']
}

const reducer = combineReducers({
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategory
})
const persistedReducer = persistReducer(persistConfig,reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tmdbApi.middleware),
});

setupListeners(store.dispatch)
export default store




