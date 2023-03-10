import { createSlice } from '@reduxjs/toolkit';
import { 
  deleteCategory,
  updateCategory,
  fetchCategories,
  addCategory,
  searchCategories
} from './categoryActions';

const initialState = {
    categories: [],
    error: null,
    status: null
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch handler
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        if(!action.payload.message) {
          state.categories = action.payload
          state.status = null
          state.error = null
        } else {
          state.status = null
          state.error = "no categories"
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Search handler
    builder
    .addCase(searchCategories.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(searchCategories.fulfilled, (state, action) => {
      if(action.payload.error) {
        state.error = action.payload.error
      }
      state.categories = action.payload
      state.status = null
      state.error = null
    })
    .addCase(searchCategories.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    })

    // Create category handler
    builder
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = "Cette catégorie existe déjà";
        } else {
          if(state.categories) {
            state.categories.unshift(action.payload);
          } else {
            state.categories = [action.payload]
          }
          state.error = null;
        }
        state.status = null
        state.error = null
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Delete category handler
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        }
        state.categories = state.categories.filter(category => category._id != action.meta.arg);
        state.status = null
        state.error = null
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })

    // Update category handler
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if(action.payload.error) {
          state.error = action.payload.error
        } else {
          state.categories = state.categories.map(category => category._id == action.meta.arg.id ?
            {...category, libelle: action.meta.arg.libelle} : category);
        }
        state.status = null
        state.error = null
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
      })
  },
});


export default categorySlice.reducer;
