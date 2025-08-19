import { apiSlice } from '../services/apiSlice';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createChat: builder.mutation({
            query: ({ message }) => ({
                url: `chat/create`,
                method: 'POST',
                body: { message },
            }),
        }),
        getChats: builder.query({
            query: () => ({
                url: `chat/all`,
            }),
        }),
        deleteChat: builder.mutation({
            query: () => ({
                url: `chat/delete`,
                method: 'DELETE',
            }),
        }),
        checkEmptyChat: builder.query({
            query: () => ({
                url: `chat/check-empty`,
            }),
        }),
    }),
});

export const {
    useCreateChatMutation,
    useGetChatsQuery,
    useDeleteChatMutation,
    useCheckEmptyChatQuery,
} = chatApiSlice;