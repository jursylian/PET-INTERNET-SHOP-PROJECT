import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await axios.get("http://localhost:3333/products/all");
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categoryItems: [],
    loading: false,
    error: null,
    filters: {
      discountOnly: false,
      priceForm: "",
      priceTo: "",
      sort: "default",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCategoryItems: (state, action) => {
      state.categoryItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setFilters, setCategoryItems } = productsSlice.actions;
export default productsSlice.reducer;
