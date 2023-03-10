import { createSlice } from '@reduxjs/toolkit';

import { 
    fetchProductsByPage,
    addProduct,
    deleteProduct,
    updateProduct
} from './productActions';

const initialState = {
    products: [],
    total_pages: 0,
    error: null,
    status: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Fetch by page handler
    builder
      .addCase(fetchProductsByPage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByPage.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.products = action.payload.products
        state.total_pages = action.payload.total_pages
        state.status = null
        state.error = null
      })
      .addCase(fetchProductsByPage.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Create product handler
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error;
        } else {
          if(state.products) {
            state.products.unshift(action.payload);
          } else {
            state.products = [action.payload]
          }
          state.error = null;
        }
        state.status = null;
        
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = null;
        state.error = action.payload.error;
      })
    
    // Delete product handler
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id != action.payload._id);
        state.status = null;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Update product handler
    builder
    .addCase(updateProduct.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error;
      } else {
        const { price, libelle, category } = action.meta.arg;
        state.products = state.products.map(product => product._id === action.meta.arg.id ? 
        {...product, price: price, libelle: libelle, category: action.payload.category} 
        : product
        )
      }

      })
    .addCase(updateProduct.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    })
  },
});


export default productSlice.reducer;
