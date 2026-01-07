import { configureStore } from '@reduxjs/toolkit';
import authenticateReducer from './authenticateSlice';

export const store = configureStore({
  reducer: {
    authenticator: authenticateReducer,
  },
})