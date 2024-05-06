import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveUpIngredient: (state, action) => {
      const ingredient = state.constructorItems.ingredients[action.payload];

      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        0,
        ingredient
      );
    },
    moveDownIngredient: (state, action) => {
      const ingredient = state.constructorItems.ingredients[action.payload];

      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(
        action.payload + 1,
        0,
        ingredient
      );
    },
    clearConstructorItems: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    selectConstructorItems: (sliceState) => sliceState.constructorItems
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructorItems
} = burgerConstructorSlice.actions;
export const { selectConstructorItems } = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
