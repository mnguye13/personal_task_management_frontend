import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rhsmbwmqe0.execute-api.us-east-2.amazonaws.com/" }), // Replace with your API endpoint
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "tasks",
      providesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...put }) => ({ url: `tasks/${id}`, method: "PUT", body: { id, ...put } }),
      invalidatesTags: ["Task"],
    }),
    postTask: builder.mutation({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useUpdateTaskMutation, usePostTaskMutation } = tasksApi;
