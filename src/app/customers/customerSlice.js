import { createSlice } from '@reduxjs/toolkit';

import { 
    fetchCustomersByPage,
    createCustomer,
    deleteCustomer,
    updateCustomer
} from './customerActions';

const initialState = {
    customers: [],
    total_pages: 0,
    error: null,
    status: null
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Fetch by page handler
    builder
      .addCase(fetchCustomersByPage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomersByPage.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.customers = action.payload.customer
        state.total_pages = action.payload.total_pages
        state.status = null
        state.error = null
      })
      .addCase(fetchCustomersByPage.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Create customer handler
    builder
      .addCase(createCustomer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error;
        } else {
          if(state.customers) {
            state.customers.unshift(action.payload);
          } else {
            state.customers = [action.payload]
          }
          state.error = null;
        }
        state.status = null;
        
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = null;
        state.error = action.payload.error;
      })
    
    // Delete customer handler
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(customer => customer._id != action.payload.customer._id);
        state.status = null;
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Update customer handler
    builder
    .addCase(updateCustomer.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(updateCustomer.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error;
      } else {
        const { firstname, lastname, category } = action.meta.arg;
        state.customers = state.customers.map(customer => customer._id === action.meta.arg.id ? 
        {...action.payload} 
        : customer
        )
      }

      })
    .addCase(updateCustomer.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    })
  },
});


export default customerSlice.reducer;
