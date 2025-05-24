import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  subCategory: [],
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
  },
});

export const { setAllCategory } = productsSlice.actions;
export default productsSlice.reducer;
