import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './reducers';

export default configureStore({
  reducer: RootReducer,
});
