import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/',
    credentials: 'include',
 });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Chat'],
    endpoints: (builder) => ({}),
});