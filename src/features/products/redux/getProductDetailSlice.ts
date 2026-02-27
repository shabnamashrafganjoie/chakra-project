import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductDetailState } from "@/features/products/types/product.types";
import { getProductById } from "@/features/products/services/productsService";

const initialState: ProductDetailState = {
  loading: false,
  product: null,
  error: null,
};

export const fetchProductById = createAsyncThunk<Product,number>(
  "products/getProductById",
  async (id:number) => {
        // NOTE: Fetch a single product by ID from the service layer

    return await getProductById(id);
  }
);

const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
        

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
                // NOTE: product is not reset here, previous product data persists until new data arrives

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
