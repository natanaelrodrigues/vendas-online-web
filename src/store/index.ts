import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import globalReducer from './reducers/globalReducer';

const store = configureStore({
  reducer: {
    productReducer,
    categoryReducer,
    globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
