import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductState } from "@/features/products/types/product.types";
import { getProducts } from "@/features/products/services/productsService";
// TypeScript type (اگر پروژه TS داری)

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
};

// Async thunk برای گرفتن محصولات
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});
export default productsSlice.reducer;
