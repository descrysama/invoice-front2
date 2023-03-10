import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchRepairAPI,
    searchRepairAPI,
    deleteRepairAPI,
    updateRepairAPI,
    createRepairAPI
} from "./repairAPI";

export const fetchRepair = createAsyncThunk(
    'category/fetchRepair',
    async (thunkAPI) => {
      const response = await fetchRepairAPI();
      return response;
    }
);

export const addRepair = createAsyncThunk(
  'product/addRepair',
  async (data, thunkAPI) => {
    const response = await createRepairAPI(data);
    return response;
  }
);

export const searchRepair = createAsyncThunk(
  'category/searchRepair',
  async (query, thunkAPI) => {
    const response = await searchRepairAPI(query);
    return response;
  }
);

export const updateRepair = createAsyncThunk(
  'category/updateRepair',
  async (formContent, thunkAPI) => {
    const response = await updateRepairAPI(formContent);
    return response;
  }
);

export const deleteRepair = createAsyncThunk(
  'category/deleteRepair',
  async (categoryId, thunkAPI) => {
    const response = await deleteRepairAPI(categoryId);
    return response;
  }
);