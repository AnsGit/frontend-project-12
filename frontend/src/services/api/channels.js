import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: ((headers, { getState }) => {
      const state = getState();

      if (state?.user?.token) {
        headers.set('Authorization', `Bearer ${state.user.token}`);
      }

      return headers;
    }),
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      keepUnusedDataFor: 0,
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export default channelsApi;

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} = channelsApi;
