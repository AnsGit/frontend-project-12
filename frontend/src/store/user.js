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

const signup = createAsyncThunk(
  'user/signup',
  async ({ username, password }) => {
    const response = await axios.post('/api/v1/signup', { username, password });
    return response.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    username: null,
    login: { status: 'pending' },
    signup: { status: 'pending' },
    ...getUserStateFromLocalstorage(),
  },
  /* eslint-disable no-param-reassign */
  reducers: {
    exit: (state) => {
      state.username = null;
      state.token = null;

      saveUserStateToLocalstorage({ username: null, token: null });
    },
  },
  extraReducers: (builder) => {
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

    builder
      .addCase(signup.pending, (state) => {
        state.signup.status = 'pending';
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.signup.status = 'success';

        state.username = payload.username;
        state.token = payload.token;

        saveUserStateToLocalstorage(payload);
      })
      .addCase(signup.rejected, (state) => {
        state.signup.status = 'error';
      });
  },
  /* eslint-enable no-param-reassign */
});

export { login, signup };
export const { exit } = userSlice.actions;

export default userSlice.reducer;
