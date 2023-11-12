import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://wj8xcseapi.execute-api.us-east-2.amazonaws.com/default/" }), // Replace with your API endpoint
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "fetchNews",
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
