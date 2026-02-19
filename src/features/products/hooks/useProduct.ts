import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/features/products/redux/getProductDetailSlice";

import type { RootState, AppDispatch } from "@/store/store";

export const useProduct = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product.product);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  return { product, loading, error };
};
