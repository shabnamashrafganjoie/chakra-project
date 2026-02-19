import { Product } from "@/features/products/types/product.types";
import { fetchAllProducts, fetchProduct } from "@/features/products/repositories/productsRepository";

export const getProducts = async (): Promise<Product[]> => {
  return await fetchAllProducts();
};

export const getProductById = async (id: number): Promise<Product> => {

  return await fetchProduct(id);
};