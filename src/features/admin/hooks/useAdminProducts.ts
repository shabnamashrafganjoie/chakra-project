import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/admin/redux/getAdminProductsSlice";

import type { RootState, AppDispatch } from "@/store/store";
// NOTE: Custom hook for managing and fetching the list of products in the admin section

export const useAdminProducts = () => {
  const dispatch = useDispatch<AppDispatch>(); // Get dispatch with correct typing
  const products = useSelector((state: RootState) => state.products.products);// Get products from state
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
// NOTE: useEffect to dispatch the fetchProducts action as soon as the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { products, loading, error };
};
