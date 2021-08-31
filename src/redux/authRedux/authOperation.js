import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const tokenState = {
  setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  cleanToken() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk('auth/register', async dataUser => {
  const { data } = await axios.post('/users/signup', dataUser);
  tokenState.setToken(data.token);
  console.log(axios.defaults.headers.common.Authorization);
  return data;
});

export const login = createAsyncThunk('auth/login', async dataUser => {
  // console.log(axios.defaults.headers.common.Authorization);
  const { data } = await axios.post('/users/login', dataUser);
  tokenState.setToken(data.token);
  return data;
});

export const logOut = createAsyncThunk('auth/logOut', async () => {
  await axios.post('/users/logout');
  tokenState.cleanToken();
});

export const fetchByToken = createAsyncThunk(
  'auth/fetchByToken',
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    tokenState.setToken(token);
    const { data } = await axios('/users/current');
    return data;
  },
);
