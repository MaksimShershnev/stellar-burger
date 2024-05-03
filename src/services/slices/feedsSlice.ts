import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () =>
  getFeedsApi()
);

type TFeedState = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  isLoadingFeeds: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoadingFeeds: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearFeeds: (state) => {
      state.orders = [];
    }
  },
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectOrdersTotal: (sliceState) => sliceState.total,
    selectOrdersTotalToday: (sliceState) => sliceState.totalToday,
    selectIsLoadingFeeds: (sliceState) => sliceState.isLoadingFeeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoadingFeeds = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoadingFeeds = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoadingFeeds = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        console.log(action.payload);
        // state.orders = action.payload;
        state.error = null;
      });
  }
});

export const { clearFeeds } = feedsSlice.actions;
export const {
  selectOrders,
  selectOrdersTotal,
  selectOrdersTotalToday,
  selectIsLoadingFeeds
} = feedsSlice.selectors;

export default feedsSlice.reducer;
