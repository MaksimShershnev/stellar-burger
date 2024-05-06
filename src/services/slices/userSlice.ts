import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', async () =>
  getUserApi()
);

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (userData: TLoginData) => loginUserApi(userData)
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async () => logoutApi()
);

export const fetchUpdateUserData = createAsyncThunk(
  'user/fetchUpdateUserData',
  async (userData: Partial<TRegisterData>) => updateUserApi(userData)
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (userData: TRegisterData) => registerUserApi(userData)
);

type TUserState = {
  isAuthChecked: boolean;
  userData: TUser | null;
  userOrders: TOrder[];
  error: string | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  userOrders: [],
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (sliceState) => sliceState.isAuthChecked,
    userDataSelector: (sliceState) => sliceState.userData
  },
  extraReducers: (builder) => {
    builder
      //------------------- checkAuth -----------------//
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        state.error = null;
      })
      //------------------- login -----------------//
      .addCase(fetchLoginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      //------------------- logout -----------------//
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        state.userData = null;
      })
      //------------------- register -----------------//
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.error = null;
      })
      //------------------- updateUserData ----------------- //
      .addCase(fetchUpdateUserData.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(fetchUpdateUserData.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchUpdateUserData.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        state.error = null;
      });
  }
});

// export const { authChecked } = userSlice.actions;
export const { isAuthCheckedSelector, userDataSelector } = userSlice.selectors;

export default userSlice.reducer;
