import { createSlice, current } from '@reduxjs/toolkit';
import { fetchClientsForSearch, setSelectedUser, removeSelectedUser, setRepairSearch, createQuote, fetchQuotesByPage, deleteQuote } from './quoteActions';

const initialState = {
    quotes: [],
    clientsforquote: [],
    repairList: [],
    quoteList: [],
    selectedRepair: [],
    selectedUser: "",
    total_pages: 0,
    error: null,
    status: null
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    deleteQuoteRepairs: (state, action) => {
      state.selectedRepair = state.selectedRepair.filter((repair) => repair._id != action.payload._id)
    },
    updateQuoteRepairs: (state, action) => {
      let index = state.selectedRepair.findIndex((repair, key) => repair._id === action.payload._id);
      if(action.payload.qty <= 0) {
        state.selectedRepair = state.selectedRepair.filter((repair) => repair._id != action.payload._id)
      } else {
        state.selectedRepair[index].qty = action.payload.qty
      }
    },
    setSelectedRepair: (state, action) => {
      let conditionVar;
      current(state.selectedRepair).forEach(repair => {
        if(!conditionVar && repair._id == action.payload._id) {
          conditionVar = true;
        }
      })
      if(!conditionVar) {
        state.selectedRepair.push({...action.payload, qty: 1})
      }
    },
    removeSelectedUser: (state, action) => {
      state.selectedUser = "";
    }
  },
  extraReducers: (builder) => {
    // search by page with filter
    builder
    .addCase(fetchQuotesByPage.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }
      state.quoteList = action.payload.quotes
      state.total_pages = action.payload.total_pages
      state.status = null
      state.error = null
    })
    builder
    .addCase(fetchClientsForSearch.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }
      state.clientsforquote = action.payload.customer ? action.payload.customer : [];
    })
    builder
    .addCase(setSelectedUser.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.selectedUser = action.payload;
      }
    })

    // Search repair handler
    builder
    .addCase(setRepairSearch.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.repairList = action.payload
        state.status = null
        state.error = null
    })

    // Create quote handler
    builder
    .addCase(createQuote.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.repairList = []
        state.selectedRepair = []
        state.selectedUser = ""
        state.status = null
        state.error = null
    })
    builder
    .addCase(deleteQuote.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.quoteList = state.quoteList.filter(quote => quote._id != action.meta.arg);
        state.status = null
        state.error = null
    })
  },
});


export default quoteSlice.reducer;
