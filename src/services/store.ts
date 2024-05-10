import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import feedsSlice from './slices/feedsSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import * as burgerApi from '@api';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: burgerApi
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
