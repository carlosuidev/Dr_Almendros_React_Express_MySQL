import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './userAuthSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});