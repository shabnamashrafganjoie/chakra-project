import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/features/products/redux/getProductDetailSlice";

import type { RootState, AppDispatch } from "@/store/store";

export const useProduct = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product.product);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);
  // NOTE: Custom hook for fetching and accessing a single product by ID

  useEffect(() => {
        // NOTE: Fetches product data when component mounts or id changes

    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  return { product, loading, error };
};
