import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: ((headers, { getState }) => {
      const state = getState();

      if (state?.user?.token) {
        headers.set('Authorization', `Bearer ${state.user.token}`);
      }

      return headers;
    }),
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      keepUnusedDataFor: 0,
    }),
    addMessage: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export default messagesApi;

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
