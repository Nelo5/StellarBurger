import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

interface OrdersDataState {
  totalToday: number;
  total: number;
  orders: TOrder[];
  currentOrder: TOrder | null;
  isFeedsLoading: boolean;
  isOrderLoading: boolean;
  error: string | null;
}

const initialState: OrdersDataState = {
  totalToday: 0,
  total: 0,
  orders: [],
  currentOrder: null,
  isFeedsLoading: false,
  isOrderLoading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/getAll', async () =>
  getFeedsApi()
);

export const getCurrentOrder = createAsyncThunk(
  'orders/getCurrent',
  async (id: number) => getOrderByNumberApi(id)
);

const feedSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectTotalOrders: (sliceState) => sliceState.total,
    selectTotalTodayOrders: (sliceState) => sliceState.totalToday,
    selectCurrentOrder: (sliceState) => sliceState.currentOrder,
    selectIsFeedsLoading: (sliceState) => sliceState.isFeedsLoading,
    selectIsOrderLoading: (sliceState) => sliceState.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (sliceState) => {
        sliceState.isFeedsLoading = true;
      })
      .addCase(getOrders.fulfilled, (sliceState, action) => {
        sliceState.isFeedsLoading = false;
        sliceState.orders = action.payload.orders;
        sliceState.total = action.payload.total;
        sliceState.totalToday = action.payload.totalToday;
      })
      .addCase(getOrders.rejected, (sliceState, action) => {
        sliceState.isFeedsLoading = false;
        sliceState.error = action.error.message!;
      })
      .addCase(getCurrentOrder.pending, (sliceState) => {
        sliceState.isOrderLoading = true;
        sliceState.currentOrder = null;
      })
      .addCase(getCurrentOrder.fulfilled, (sliceState, action) => {
        sliceState.isOrderLoading = false;
        sliceState.currentOrder = action.payload.orders[0];
      })
      .addCase(getCurrentOrder.rejected, (sliceState, action) => {
        sliceState.isOrderLoading = false;
        sliceState.error = action.error.message!;
      });
  }
});

export const {
  selectOrders,
  selectIsFeedsLoading,
  selectTotalOrders,
  selectTotalTodayOrders,
  selectCurrentOrder,
  selectIsOrderLoading
} = feedSlice.selectors;

export default feedSlice.reducer;
