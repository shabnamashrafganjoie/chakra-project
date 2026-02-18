import { Product } from "@/features/products/types/product.types";
import { fetchAllProducts } from "@/features/products/repositories/productsRepository";

export const getProducts = async (): Promise<Product[]> => {
  return await fetchAllProducts();
};