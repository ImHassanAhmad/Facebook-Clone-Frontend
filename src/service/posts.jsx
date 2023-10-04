// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3000/api" });

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQuery,
  tagTypes: ["Posts"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ userId, params }) => ({
        url: "posts/" + userId + params,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "posts/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: "posts/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
