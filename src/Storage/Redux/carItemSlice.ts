import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carItem: [],
};

export const carItemSlice = createSlice({
  name: "CarItem",
  initialState: initialState,
  reducers: {
    setCarItem: (state, action) => {
      state.carItem = action.payload;
    },
  },
});

export const { setCarItem} = carItemSlice.actions;
export const carItemReducer = carItemSlice.reducer;