import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  allSubCategory: [],
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload];
    },
    setAllSubCategory: (state, action) => {
      state.allSubCategory = [...action.payload]
    }
  },
});

export const { setAllCategory, setAllSubCategory } = productsSlice.actions;
export default productsSlice.reducer;
