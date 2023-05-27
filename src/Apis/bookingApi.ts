import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7254/api/",
  }),
  tagTypes: ["BookingController"],
  endpoints: (builder) => ({
    
    getBooking: builder.query({
      query: (userId) => ({
        url: `BookingController`,
        params:{
          userId:userId
        }
      }),
      providesTags: ["BookingController"],
    }),
    updateBooking :builder.mutation({
      query:({carListId,userId,removeCar})=>({
        url:"BookingController",
        method:"POST",
        params:{
          carListId,
          userId,
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

