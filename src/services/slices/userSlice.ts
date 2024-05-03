import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchUser = createAsyncThunk('user/fetchUser', async () =>
  getIngredientsApi()
);

type TIngredientState = {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  ingredients: [],
  currentIngredient: null,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      state.currentIngredient =
        state.ingredients.find(
          (ingredient) => ingredient._id === action.payload
        ) || null;
    }
  },
  selectors: {
    // selectIngredients: (sliceState) => sliceState.ingredients,
    // selectIsLoading: (sliceState) => sliceState.isLoading,
    // selectIngredient: (sliceState) => sliceState.currentIngredient
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.error = null;
      });
  }
});

// export const { setIngredient } = ingredientsSlice.actions;
// export const {  } = ingredientsSlice.selectors;

export default userSlice.reducer;
