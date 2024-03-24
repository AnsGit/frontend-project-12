import { createSlice } from '@reduxjs/toolkit';

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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    username: null,
    ...getUserStateFromLocalstorage(),
  },
  reducers: {
    login: (state, action) => {
      // eslint-disable-next-line
      state = {...state, ...action.payload};

      saveUserStateToLocalstorage(action.payload);
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
