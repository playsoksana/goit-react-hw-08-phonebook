import { createSlice } from '@reduxjs/toolkit';
import { register, login, logOut, fetchByToken } from './authOperation';

const initialState = {
  user: { name: null, email: null },
  isLoader: false,
  token: null,
  error: false,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending]: state => {
      state.isLoader = true;
      state.error = false;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isLoader = false;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [register.rejected]: state => {
      state = { ...initialState, error: true };
    },
    [login.pending]: state => {
      state.isLoader = true;
      state.error = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isLoader = false;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [login.rejected]: state => {
      state = { ...initialState, error: true };
    },
    [logOut.pending]: state => {
      state.error = false;
    },
    [logOut.fulfilled]: state => {
      state.isLoader = false;
      state.token = null;
      state.isLoggedIn = false;
      state.user = { name: null, email: null };
    },
    [logOut.rejected]: state => {
      state.error = true;
      state.isLoader = false;
    },
    [fetchByToken.pending]: state => {
      state.error = false;
      state.isLoader = true;
    },
    [fetchByToken.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoader = false;
      state.isLoggedIn = true;
    },
    [fetchByToken.rejected]: state => {
      state.error = true;
      state.isLoader = false;
    },
  },
});

export default authSlice.reducer;
