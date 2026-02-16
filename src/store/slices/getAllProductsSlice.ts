import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// TypeScript type (اگر پروژه TS داری)
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  [key: string]: any; // اگر فیلد اضافی بود
}

interface ProductState {
  loading: boolean;
  products: Product[];
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
};

// Async thunk برای گرفتن محصولات
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products || [];
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
