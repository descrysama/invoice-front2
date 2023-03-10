import { fetchClientsForSearchAPI, fetchSingleUserAPI, createQuoteAPI, setRepairSearchAPI, fetchQuotesByPageAPI, deleteQuoteAPI} from "./quoteAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuotesByPage = createAsyncThunk(
  'quote/fetchByPage',
  async (payload, thunkAPI) => {
    const response = await fetchQuotesByPageAPI(payload);
    return response;
  }
);

export const fetchClientsForSearch = createAsyncThunk(
    'quote/fetchClientsForSearch',
    async (payload, thunkAPI) => {
      const response = await fetchClientsForSearchAPI(payload);
      return response;
    }
);


export const setRepairSearch = createAsyncThunk(
  'quote/setRepairSearch',
  async (payload, thunkAPI) => {
    const response = await setRepairSearchAPI(payload);
    return response;
  }
);

export const setSelectedUser = createAsyncThunk(
  'quote/setSelectedUser',
  async (payload, thunkAPI) => {
    const response = await fetchSingleUserAPI(payload);
    return response;
  }
);

export const createQuote = createAsyncThunk(
  'quote/createQuote',
  async (payload, thunkAPI) => {
    const response = await createQuoteAPI(payload);
    return response;
  }
);

export const deleteQuote = createAsyncThunk(
  'quote/deleteQuote',
  async (payload, thunkAPI) => {
    const response = await deleteQuoteAPI(payload);
    return response;
  }
);

export const updateQuoteRepairs = (payload) => {
  return {
    type: "quote/updateQuoteRepairs",
    payload: {
      _id: payload._id,
      qty: payload.qty
    }
  } 
}

export const deleteQuoteRepairs = (payload) => {
  return {
    type: "quote/deleteQuoteRepairs",
    payload: {
      _id: payload
    }
  } 
}

export const setSelectedRepair = (payload) => {
  return {
    type: "quote/setSelectedRepair",
    payload: payload
  } 
}

export const removeSelectedUser = (payload) => {
  return {
    type: "quote/removeSelectedUser"
  } 
}

