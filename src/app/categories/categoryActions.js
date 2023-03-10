import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    deleteCategoryAPI,
    fetchCategoriesAPI,
    updateCategoryAPI,
    addCategoryAPI,
    searchCategoriesAPI
} from './categoryAPI';


export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (thunkAPI) => {
      const response = await fetchCategoriesAPI();
      return response;
    }
);

export const searchCategories = createAsyncThunk(
  'category/searchCategories',
  async (query, thunkAPI) => {
    const response = await searchCategoriesAPI(query);
    return response;
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (libelle, thunkAPI) => {
    const response = await addCategoryAPI(libelle);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (categoryId, thunkAPI) => {
      const response = await deleteCategoryAPI(categoryId);
      return response;
    }
);

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (formContent, thunkAPI) => {
      const response = await updateCategoryAPI(formContent);
      return response;
    }
);