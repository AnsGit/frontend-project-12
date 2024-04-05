import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    data: {
      id: null,
      name: null,
      removable: false,
    },
  },
  reducers: {
    /* eslint-disable no-param-reassign */
    chooseChannel: ((state, action) => {
      state.data = action.payload;
    }),
    /* eslint-enable no-param-reassign */
  },
});

export const { chooseChannel } = channelSlice.actions;
export default channelSlice.reducer;
