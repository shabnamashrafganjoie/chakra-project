import { Product } from "@/features/admin/types/adminProduct.type";

export const fetchAllProducts = async (): Promise<Product[]> => {
    // NOTE: Fetching products from the dummy JSON API

  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products || [];// NOTE: Return empty array if products property doesn't exist
};

