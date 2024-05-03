import { getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchOrderData = createAsyncThunk(
  'order/fetchOrderData',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);

type TOrderState = {
  orderData: TOrder;
  isLoading: boolean;
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
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderData = initialState.orderData;
    }
  },
  selectors: {
    selectOrderData: (sliceState) => sliceState.orderData,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchOrderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.orders[0];
        state.error = null;
      });
  }
});

export const { clearOrderData } = orderSlice.actions;
export const { selectOrderData, selectIsLoading } = orderSlice.selectors;

export default orderSlice.reducer;
