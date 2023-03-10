import { 
    fetchProductsByPageAPI,
    createProductAPI,
    deleteProductAPI,
    updateProductAPI
 } from './productAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProductsByPage = createAsyncThunk(
    'product/fetchProductsByPage',
    async (payload, thunkAPI) => {
      const response = await fetchProductsByPageAPI(payload);
      return response;
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data, thunkAPI) => {
      const response = await createProductAPI(data);
      return response;
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (product_id, thunkAPI) => {
      const response = await deleteProductAPI(product_id);
      return response;
    }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data, thunkAPI) => {
    const response = await updateProductAPI(data);
    return response;
  }
);