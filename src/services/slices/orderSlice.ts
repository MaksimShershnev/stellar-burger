import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderData = createAsyncThunk(
  'order/getOrderData',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

export const getUserOrders = createAsyncThunk('order/getUserOrders', async () =>
  getOrdersApi()
);

export const fetchOrderBurger = createAsyncThunk(
  'order/fetchOrderBurger',
  async (orderData: string[]) => orderBurgerApi(orderData)
);

type TOrderState = {
  orderData: TOrder;
  userOrders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  isLoadingOrderData: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: '',
    number: 0
  },
  userOrders: [],
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  isLoadingOrderData: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderData = initialState.orderData;
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderData: (sliceState) => sliceState.orderData,
    selectUserOrders: (sliceState) => sliceState.userOrders,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIsLoadingOrderData: (sliceState) => sliceState.isLoadingOrderData,
    selectRequest: (sliceState) => sliceState.orderRequest,
    selectModalData: (sliceState) => sliceState.orderModalData
  },
  extraReducers: (builder) => {
    builder
      // ---------------OrderData --------------------//
      .addCase(getOrderData.pending, (state) => {
        state.isLoadingOrderData = true;
        state.error = null;
      })
      .addCase(getOrderData.rejected, (state, action) => {
        state.isLoadingOrderData = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.isLoadingOrderData = false;
        state.orderData = action.payload.orders[0];
        state.error = null;
      })
      // ---------------userOrders --------------------//
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
        state.error = null;
      })
      // ---------------orderBurger --------------------//
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.error = null;
      });
  }
});

export const { clearOrderData, clearOrderModalData } = orderSlice.actions;
export const {
  selectOrderData,
  selectIsLoading,
  selectUserOrders,
  selectIsLoadingOrderData,
  selectRequest,
  selectModalData
} = orderSlice.selectors;

export default orderSlice.reducer;
