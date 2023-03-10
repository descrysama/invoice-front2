import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCustomerAPI, createCustomerAPI, fetchCustomersByPageAPI, updateCustomerAPI } from "./customerAPI";

export const fetchCustomersByPage = createAsyncThunk(
    'customer/fetchCustomersByPage',
    async (payload, thunkAPI) => {
      const response = await fetchCustomersByPageAPI(payload);
      return response;
    }
);

export const createCustomer = createAsyncThunk(
    'customer/createCustomer',
    async (payload, thunkAPI) => {
      const response = await createCustomerAPI(payload);
      return response;
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (payload, thunkAPI) => {
      const response = await deleteCustomerAPI(payload);
      return response;
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (payload, thunkAPI) => {
      const response = await updateCustomerAPI(payload);
      return response;
    }
);
