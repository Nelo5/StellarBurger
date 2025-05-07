import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersDataState {
  order: TOrder | null;
  isOrderLoading: boolean;
  error: string | null;
}

const initialState: OrdersDataState = {
  order: null,
  isOrderLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'orders/getAll',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isOrderLoading = false;
    }
  },
  selectors: {
    selectOrder: (sliceState) => sliceState.order,
    selectIsOrderLoading: (sliceState) => sliceState.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (sliceState) => {
        sliceState.isOrderLoading = true;
      })
      .addCase(createOrder.fulfilled, (sliceState, action) => {
        sliceState.isOrderLoading = false;
        sliceState.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (sliceState, action) => {
        sliceState.isOrderLoading = false;
        sliceState.error = action.error.message!;
      });
  }
});

export const { selectOrder, selectIsOrderLoading } = orderSlice.selectors;

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
