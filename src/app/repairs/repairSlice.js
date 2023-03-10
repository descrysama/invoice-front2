import { createSlice, current } from '@reduxjs/toolkit';
import {
    fetchRepair,
    searchRepair,
    deleteRepair,
    updateRepair,
    addRepair
} from "./repairActions"

const initialState = {
    repairs: [],
    error: null,
    status: null
};

export const repairSlice = createSlice({
  name: 'repair',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch repair handler
    builder
      .addCase(fetchRepair.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRepair.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        if(!action.payload.message) {
          state.repairs = action.payload
          state.status = null
          state.error = null
        } else {
          state.status = null
          state.error = "no categories"
        }
      })
      .addCase(fetchRepair.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Create product handler
    builder
      .addCase(addRepair.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addRepair.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error;
        } else {
          if(current(state.repairs)) {
            state.repairs.unshift(action.payload);
          } else {
            state.repairs = [action.payload]
          }
          state.error = null;
        }
        state.status = null;
        
      })
      .addCase(addRepair.rejected, (state, action) => {
        state.status = null;
        state.error = action.payload.error;
      })

    // Search repair handler
    builder
      .addCase(searchRepair.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
      .addCase(searchRepair.fulfilled, (state, action) => {
          if(action.payload.error) {
            state.error = action.payload.error
          }
          state.repairs = action.payload
          state.status = null
          state.error = null
        })
      .addCase(searchRepair.rejected, (state, action) => {
          state.status = 'error';
          state.error = action.payload.error;
        })

    // Delete repair handler
    builder
      .addCase(deleteRepair.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteRepair.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.repairs = state.repairs.filter(repair => repair._id != action.meta.arg);
        state.status = null
        state.error = null
      })
      .addCase(deleteRepair.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Update repair handler
    builder
    .addCase(updateRepair.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(updateRepair.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      } else {
        state.repairs = state.repairs.map(repair => repair._id == action.meta.arg.id ?
          {...repair, libelle: action.meta.arg.libelle, price: action.meta.arg.price, category: action.payload.category} : repair);
      }
      state.status = null
      state.error = null
    })
    .addCase(updateRepair.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    })
  },
});


export default repairSlice.reducer;
