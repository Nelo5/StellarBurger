import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../utils/cookie';
import { TOrder, TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const getOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

interface userState {
  isAuth: boolean;
  orders: TOrder[];
  user: TUser | null;
  isOrdersLoading: boolean;
  isUserLoading: boolean;
  error: string | null;
}

const initialState: userState = {
  isAuth: false,
  orders: [],
  user: null,
  isOrdersLoading: false,
  isUserLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (sliceState) => {
      sliceState.error = null;
    }
  },
  selectors: {
    selectUserOrders: (sliceState) => sliceState.orders,
    selectIsAuth: (sliceState) => sliceState.isAuth,
    selectIsOrdersLoading: (sliceState) => sliceState.isOrdersLoading,
    selectIsUserLoading: (sliceState) => sliceState.isUserLoading,
    selectEmail: (sliceState) => sliceState.user?.email,
    selectName: (sliceState) => sliceState.user?.name,
    selectUser: (sliceState) => sliceState.user,
    selectError: (sliceState) => sliceState.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (sliceState) => {
        sliceState.isUserLoading = true;
        sliceState.isAuth = false;
        sliceState.error = null;
      })
      .addCase(registerUser.fulfilled, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.user = action.payload;
        sliceState.isAuth = true;
      })
      .addCase(registerUser.rejected, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.error = action.error.message!;
      })
      .addCase(loginUser.pending, (sliceState) => {
        sliceState.isUserLoading = true;
        sliceState.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.user = action.payload;
        sliceState.isAuth = true;
      })
      .addCase(loginUser.rejected, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.error = action.error.message!;
      })
      .addCase(logoutUser.pending, (sliceState) => {
        sliceState.user = null;
        sliceState.isAuth = false;
        sliceState.isUserLoading = false;
      })
      .addCase(getOrders.pending, (sliceState) => {
        sliceState.isOrdersLoading = true;
      })
      .addCase(getOrders.fulfilled, (sliceState, action) => {
        sliceState.isOrdersLoading = false;
        sliceState.orders = action.payload;
      })
      .addCase(getOrders.rejected, (sliceState) => {
        sliceState.isOrdersLoading = false;
        sliceState.orders = [];
      })
      .addCase(getUser.pending, (sliceState) => {
        sliceState.isUserLoading = true;
      })
      .addCase(getUser.fulfilled, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.isAuth = true;
        sliceState.user = action.payload.user;
      })
      .addCase(getUser.rejected, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.error = action.error.message!;
        sliceState.user = null;
      })
      .addCase(updateUser.pending, (sliceState) => {
        sliceState.isUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.isAuth = true;
        sliceState.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (sliceState, action) => {
        sliceState.isUserLoading = false;
        sliceState.error = action.error.message!;
      });
  }
});
export const { clearErrors } = userSlice.actions;
export const {
  selectEmail,
  selectIsAuth,
  selectIsOrdersLoading,
  selectIsUserLoading,
  selectName,
  selectUser,
  selectUserOrders,
  selectError
} = userSlice.selectors;

export default userSlice.reducer;
