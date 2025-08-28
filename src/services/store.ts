import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import feedReducer from './feed';
import userReducer from './user';
import orderReducer from './order';
import burgerConstructorReducer from './burger_constructor';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: feedReducer,
  user: userReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
