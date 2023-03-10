import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { 
  Login,
  CheckAuth,
  Logout,
  UpdateStore,
  GetProductMostSold,
  GetRepairMostSold,
  GetInvoicesByMonth,
  GetInvoicesByWeek,
  GetInvoicesByHour,
  GetInvoicesByPages
} from './storeAPI';
import {fetchClientsForSearchAPI, fetchSingleUserAPI} from '../quotes/quoteAPI';
import { fetchSingleQuoteAPI, createInvoiceAPI, RemoveInvoiceAPI } from './storeAPI';


export const login = createAsyncThunk(
  'store/login',
  async (credentials, thunkAPI) => {
    const response = await Login(credentials);
    return response;
  }
);

export const checkAuth = createAsyncThunk(
  'store/checkAuth',
  async(thunkAPI) => {
    const response = await CheckAuth();
    return response;
  }
)

export const logout = createAsyncThunk(
  'store/Logout',
  async(thunkAPI) => {
    const response = await Logout();
    return response;
  }
)
export const updateStore = createAsyncThunk(
  'store/UpdateStore',
  async(store, thunkAPI) => {
    const response = await UpdateStore(store);
    return response;
  }
)

export const getProductMostSold = createAsyncThunk(
  'store/GetProductMostSold',
  async(thunkAPI) => {
    const response = await GetProductMostSold();
    return response;
  }
)

export const getRepairMostSold = createAsyncThunk(
  'store/GetRepairMostSold',
  async(thunkAPI) => {
    const response = await GetRepairMostSold();
    return response;
  }
)
export const getInvoicesByMonth = createAsyncThunk(
  'store/GetInvoicesByMonth',
  async(thunkAPI) => {
    const response = await GetInvoicesByMonth();
    return response;
  }
)
export const getInvoicesByWeek = createAsyncThunk(
  'store/GetInvoicesByWeek',
  async( thunkAPI) => {
    const response = await GetInvoicesByWeek();
    return response;
  }
)
export const getInvoicesByHour = createAsyncThunk(
  'store/GetInvoicesByHour',
  async( thunkAPI) => {
    const response = await GetInvoicesByHour();
    return response;
  }
)
export const getInvoicesByPages = createAsyncThunk(
  'store/GetInvoicesByPages',
  async(datas, thunkAPI) => {
    const response = await GetInvoicesByPages(datas);
    return response;
  }
)

export const fetchClientsForSearch = createAsyncThunk(
  'store/fetchClientsForSearch',
  async (payload, thunkAPI) => {
    const response = await fetchClientsForSearchAPI(payload);
    return response;
  }
);

export const setSelectedUser = createAsyncThunk(
'store/setSelectedUser',
async (payload, thunkAPI) => {
  const response = await fetchSingleUserAPI(payload);
  return response;
}
);

export const setSelectedProduct = (payload) => {
    return {
      type: "store/setSelectedProduct",
      payload: payload
    } 
}

export const updateInvoiceProducts = (payload) => {
  return {
    type: "store/updateInvoiceProducts",
    payload: {
      _id: payload._id,
      qty: payload.qty
    }
  } 
}

export const deleteInvoiceProducts = (product_id) => {
  return {
    type: "store/deleteInvoiceProducts",
    payload: {
      _id: product_id
    }
  } 
}

export const deleteSelectedQuote = () => {
  return {
    type: "store/deleteSelectedQuote"
  } 
}

export const setSelectedQuote = createAsyncThunk(
  'store/setSelectedQuote',
  async (payload, thunkAPI) => {
    const response = await fetchSingleQuoteAPI(payload);
    return response;
  }
);

export const createInvoice = createAsyncThunk(
  'store/createInvoice',
  async (payload, thunkAPI) => {
    const response = await createInvoiceAPI(payload);
    return response;
  }
);

export const removeInvoice = createAsyncThunk(
  'store/removeInvoice',
  async(payload, thunkAPI) => {
    const response = await RemoveInvoiceAPI(payload);
    return response;
  }
)






const initialState = {
  isAuth: false,
  isAdmin: false,
  store: null,
  error: null,
  status: null,
  productsMostSold: null,
  repairsMostSold: null,

  selectedUser: "",
  clientsforinvoice: [],
  quoteforinvoice: [],
  selectedProducts: [],
  selectedQuote: "",

  invoicesByMonth: [],
  invoicesByWeek: [],
  invoicesByHour: [],
  invoices:[],
  total_pages : 0
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    deleteInvoiceProducts: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter((product) => product._id != action.payload._id)
    },
    deleteSelectedQuote: (state, action) => {
      state.selectedQuote = "";
    },
    updateInvoiceProducts: (state, action) => {
      let index = state.selectedProducts.findIndex((product, key) => product._id === action.payload._id);
      if(action.payload.qty <= 0) {
        state.selectedProducts = state.selectedProducts.filter((product) => product._id != action.payload._id)
      } else {
        state.selectedProducts[index].qty = action.payload.qty
      }
    },
    setSelectedProduct: (state, action) => {
      let conditionVar;
      current(state.selectedProducts).forEach(product => {
        if(!conditionVar && product._id == action.payload._id) {
          conditionVar = true;
        }
      })
      if(!conditionVar) {
        state.selectedProducts.push({...action.payload, qty: 1})
      }
    },

    deleteInvoiceRepairs: (state, action) => {
      state.selectedRepairs = state.selectedRepairs.filter((product) => product._id != action.payload._id)
    },
    updateInvoiceRepairs: (state, action) => {
      let index = state.selectedRepairs.findIndex((product, key) => product._id === action.payload._id);
      if(action.payload.qty <= 0) {
        state.selectedRepairs = state.selectedRepairs.filter((product) => product._id != action.payload._id)
      } else {
        state.selectedRepairs[index].qty = action.payload.qty
      }
    }
  },
  extraReducers: (builder) => {
    // Login section.
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.isAuth = action.payload.store ? true : false;
        state.status = null;
        state.store = action.payload.store ? action.payload.store : null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      })
      // Check authentification section.
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.isAdmin = action.payload.isAdmin;
        state.status = null;
        state.store = action.payload.store;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuth = false;
        state.isAdmin = false;
      })

    builder
    .addCase(logout.fulfilled, (state) => {
      Object.assign(state, initialState);
    })

    builder
    .addCase(updateStore.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    })
    .addCase(updateStore.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.store = {...action.payload};
      }
      
    })

    builder
    .addCase(getProductMostSold.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    })
    .addCase(getProductMostSold.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.productsMostSold = [...action.payload];
      }
    })

    builder
    .addCase(getRepairMostSold.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    }
    )
    .addCase(getRepairMostSold.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.repairsMostSold = [...action.payload];
      }
    }
    )

    builder
    .addCase(getInvoicesByMonth.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    }
    )
    .addCase(getInvoicesByMonth.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.invoicesByMonth = action.payload;
      }
    }
    )
    builder
    .addCase(getInvoicesByWeek.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    }
    )
    .addCase(getInvoicesByWeek.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.invoicesByWeek = action.payload;
      }
    }
    )
    builder
    .addCase(getInvoicesByHour.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    }
    )
    .addCase(getInvoicesByHour.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.invoicesByHour = action.payload;
      }
    }
    )
    builder
    .addCase(getInvoicesByPages.pending, (state) => {
      state.status = 'loading';
      state.error = null;
      
    }
    )
    .addCase(getInvoicesByPages.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }else{
        state.status = null;
        state.invoices = action.payload.invoices;
        state.total_pages = action.payload.total_pages;
      }
    }
    )
    builder
    .addCase(fetchClientsForSearch.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }
      state.clientsforinvoice = action.payload.customer ? action.payload.customer : [];
    })
    builder
    .addCase(setSelectedUser.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.selectedUser = action.payload;
      }
    })
    builder
    .addCase(setSelectedQuote.fulfilled, (state, action) => {
      state.selectedQuote = action.payload[0]
    })
    builder
    .addCase(createInvoice.fulfilled, (state, action) => {
      state.selectedUser = "";
      state.selectedQuote = "";
      state.selectedProducts = [];
      state.quoteforinvoice = [];
      state.clientsforinvoice = [];
    })
    builder
    .addCase(removeInvoice.fulfilled, (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice._id != action.payload._id)
    })
  },
});


export default storeSlice.reducer;
