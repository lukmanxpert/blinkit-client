import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartProduct";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cartItems: cartReducer,
  },
});
