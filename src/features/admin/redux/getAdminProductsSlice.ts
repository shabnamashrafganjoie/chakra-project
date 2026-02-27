import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductState } from "@/features/admin/types/adminProduct.type";
import { getProducts } from "@/features/admin/services/adminProductsService";

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);
// NOTE: Creating a slice to manage products state
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // NOTE: Pending state - when the request starts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // NOTE: Fulfilled state - when the request is successful
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      // NOTE: Rejected state - when the request fails
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});
export default productsSlice.reducer;
