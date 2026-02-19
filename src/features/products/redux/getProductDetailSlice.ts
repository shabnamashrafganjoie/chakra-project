import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductState, ProductDetailState } from "@/features/products/types/product.types";
import { getProductById } from "@/features/products/services/productsService";
// TypeScript type (اگر پروژه TS داری)

const initialState: ProductDetailState = {
  loading: false,
  product: null,
  error: null,
};

// Async thunk برای گرفتن محصولات
export const fetchProductById = createAsyncThunk<Product,number>(
  "products/getProductById",
  async (id:number) => {
    return await getProductById(id);
  }
);

const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});
export default productDetailSlice.reducer;
