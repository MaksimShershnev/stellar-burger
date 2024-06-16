import {
  TLoginData,
  TRegisterData,
  TUserResponse,
  TServerResponse,
  TAuthResponse
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus, SliceName, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import {
  isActionPending,
  isActionRejected
} from '../../../utils/checkTypeAction';
import * as burgerApi from '@api';

export const checkUserAuth = createAsyncThunk<
  TUserResponse,
  void,
  { extra: typeof burgerApi }
>(
  `${SliceName.user}/checkUserAuth`,
  async (_, { extra: api }) => await api.getUserApi()
);

export const fetchLoginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { extra: typeof burgerApi }
>(
  `${SliceName.user}/fetchLoginUser`,
  async (userData, { extra: api }) => await api.loginUserApi(userData)
);
export const fetchLogoutUser = createAsyncThunk<
  TServerResponse<{}>,
  void,
  { extra: typeof burgerApi }
>(
  `${SliceName.user}/fetchLogoutUser`,
  async (_, { extra: api }) => await api.logoutApi()
);

export const fetchUpdateUserData = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>,
  { extra: typeof burgerApi }
>(
  `${SliceName.user}/fetchUpdateUserData`,
  async (userData, { extra: api }) => await api.updateUserApi(userData)
);

export const fetchRegisterUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { extra: typeof burgerApi }
>(
  `${SliceName.user}/fetchRegisterUser`,
  async (userData, { extra: api }) => await api.registerUserApi(userData)
);

type TUserState = {
  isAuthChecked: boolean;
  userData: TUser | null;
  requestStatus: RequestStatus;
};

const initialState: TUserState = {
  isAuthChecked: false,
  userData: null,
  requestStatus: RequestStatus.idle
};

const userSlice = createSlice({
  name: SliceName.user,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    isAuthCheckedSelector: (sliceState) => sliceState.isAuthChecked,
    userDataSelector: (sliceState) => sliceState.userData
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.success;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.requestStatus = RequestStatus.success;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        state.userData = null;
        state.requestStatus = RequestStatus.success;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.requestStatus = RequestStatus.success;
      })
      .addCase(fetchUpdateUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.success;
      })
      .addMatcher(isActionPending(SliceName.order), (state) => {
        state.requestStatus = RequestStatus.loading;
      })
      .addMatcher(isActionRejected(SliceName.order), (state) => {
        state.requestStatus = RequestStatus.error;
      });
  }
});

export const { authCheck } = userSlice.actions;
export const { isAuthCheckedSelector, userDataSelector } = userSlice.selectors;

export default userSlice;
