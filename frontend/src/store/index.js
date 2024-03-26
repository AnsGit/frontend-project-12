import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import channelReducer from './channel';
import channelsApi from '../services/api/channels';
import messagesApi from '../services/api/messages';

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(channelsApi.middleware, messagesApi.middleware)
  ),
});

export default store;
