import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7254/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["BookingController"],
  endpoints: (builder) => ({
    
    getBooking: builder.query({
      query: (userId) => ({
        url:`BookingController`,
        params:{
          userId:userId
        }
      }),
      providesTags:["BookingController"],
    }),
    updateBooking :builder.mutation({
      query:({userId,carListId,removeCar})=>({
        url:"BookingController",
        method:"POST",
        params:{
          userId,
          carListId,
          removeCar,
        },
      }),
      invalidatesTags: ["BookingController"],
    }),
  }),
});

export const {
  useGetBookingQuery,useUpdateBookingMutation
} = bookingApi;
export default bookingApi;

