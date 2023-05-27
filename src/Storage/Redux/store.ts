import { configureStore } from "@reduxjs/toolkit";
import { carItemReducer } from "./carItemSlice";
import {authApi, bookingApi, carItemApi} from "../../Apis";
import { bookingReducer } from "./bookingSlice";
import { userAuthReducer } from "./userAuthSlice";
const store = configureStore({
    reducer: {
      carItemStore: carItemReducer,
      bookingStore:bookingReducer,
      userAuthStore:userAuthReducer,
      [carItemApi.reducerPath]:carItemApi.reducer,
      [bookingApi.reducerPath]:bookingApi.reducer,
      [authApi.reducerPath]:authApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware()    
      .concat(carItemApi.middleware)
      .concat(authApi.middleware)
      .concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;