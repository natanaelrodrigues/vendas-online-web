import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import globalReducer from './reducers/globalReducer';
import orderReducer from './reducers/orderReducer';

const store = configureStore({
  reducer: {
    categoryReducer,
    globalReducer,
    orderReducer,
    productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
