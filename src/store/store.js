import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartProduct";
import addressReducer from "./addressSlice";
import orderReducer from "./orderSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cartItems: cartReducer,
    addresses: addressReducer,
    orders: orderReducer,
  },
});
