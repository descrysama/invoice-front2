import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './stores/storeSlice'
import productReducer from './products/productSlice';
import categoryReducer from './categories/categorySlice';
import repairReducer from './repairs/repairSlice';
import customerReducer from './customers/customerSlice';
import quoteReducer from './quotes/quoteSlice';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    product: productReducer,
    category: categoryReducer,
    repair: repairReducer,
    customer: customerReducer,
    quote: quoteReducer
  }
});
