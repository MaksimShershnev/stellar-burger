import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      console.log(action.payload);
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
    }
  },
  selectors: {
    selectRequest: (sliceState) => sliceState.orderRequest,
    selectModalData: (sliceState) => sliceState.orderModalData,
    selectConstructorItems: (sliceState) => sliceState.constructorItems
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchFeeds.pending, (state) => {
  //       state.isLoadingFeeds = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchFeeds.rejected, (state, action) => {
  //       state.isLoadingFeeds = false;
  //       state.error = action.error.message || 'Something went wrong';
  //     })
  //     .addCase(fetchFeeds.fulfilled, (state, action) => {
  //       state.isLoadingFeeds = false;
  //       state.orders = action.payload.orders;
  //       state.total = action.payload.total;
  //       state.totalToday = action.payload.totalToday;
  //       console.log(action.payload);
  //       // state.orders = action.payload;
  //       state.error = null;
  //     });
  // }
});

export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient
} = burgerConstructorSlice.actions;
export const { selectRequest, selectModalData, selectConstructorItems } =
  burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
