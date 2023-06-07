import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carItemApi = createApi({
  reducerPath: "carItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7254/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
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
    updateCarItem:builder.mutation({
      query:({data,id})=>({
        url:"carList/"+id,
        method:"PUT",
        body:data
      }),
      invalidatesTags:["CarList"]
    }),
    createCarItem:builder.mutation({
      query:(data)=>({
        url:"carList",
        method:"POST",
        body:data
      }),
      invalidatesTags:["CarList"]
    }),
    deleteCarItem:builder.mutation({
      query:(id)=>({
        url:"CarList/"+id,
        method:"DELETE",
      }),
      invalidatesTags:["CarList"]
    }),
  }),
});

export const {
  useGetCarItemsQuery,
  useGetCarItemByIdQuery,
  useCreateCarItemMutation,
  useDeleteCarItemMutation,
  useUpdateCarItemMutation
} = carItemApi;
export default carItemApi;

