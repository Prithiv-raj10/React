import { createSlice } from "@reduxjs/toolkit";
import { bookingModel, rentItemModel } from "../../Interfaces";

const initialState :bookingModel = {
  rentItems: [],
};

export const bookingSlice = createSlice({
  name: "bookItems",
  initialState: initialState,
  reducers: {
    setBooking: (state, action) => {
      state.rentItems = action.payload;
    },
    removeFromBooking: (state, action) => {
      
      state.rentItems = state.rentItems?.filter((item) => {
        if (item.id === action.payload.rentItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setBooking,removeFromBooking} = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;