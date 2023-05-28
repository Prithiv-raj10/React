import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carItemApi = createApi({
  reducerPath: "carItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7254/api/",
  }),
  tagTypes: ["CarList"],
  endpoints: (builder) => ({
    getCarItems: builder.query({
      query: () => ({
        url:"CarList",
      }),
      providesTags: ["CarList"],
    }),
    getCarItemById: builder.query({
      query:(id) => ({
        url:`CarList/${id}`,
      }),
      providesTags: ["CarList"],
    }),
  }),
});

export const {
  useGetCarItemsQuery,
  useGetCarItemByIdQuery,
} = carItemApi;
export default carItemApi;

