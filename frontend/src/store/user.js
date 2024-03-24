import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getUserStateFromLocalstorage = () => {
  const ls = window.localStorage;

  if (!ls.hexletChat) return null;

  const state = JSON.parse(ls.hexletChat);
  return state.user;
};

const saveUserStateToLocalstorage = (userState = {}) => {
  const ls = window.localStorage;

  const state = ls.hexletChat ? JSON.parse(ls.hexletChat) : {};

  ls.hexletChat = JSON.stringify({ ...state, user: userState });
};

const login = createAsyncThunk(
  'user/login',
  async ({ username, password }) => {
    const response = await axios.post('/api/v1/login', { username, password });
    return response.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    username: null,
    login: { status: 'pending' },
    ...getUserStateFromLocalstorage(),
  },
  reducers: {},
  extraReducers: (builder) => { /* eslint-disable no-param-reassign */
    builder
      .addCase(login.pending, (state) => {
        state.login.status = 'pending';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.login.status = 'success';

        state.username = payload.username;
        state.token = payload.token;

        saveUserStateToLocalstorage(payload);
      })
      .addCase(login.rejected, (state) => {
        state.login.status = 'error';
      });
  },
});

export { login };

export default userSlice.reducer;
