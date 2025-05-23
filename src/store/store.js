import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
