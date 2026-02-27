import { Product } from "@/features/products/types/product.types";
import { fetchAllProducts, fetchProduct } from "@/features/products/repositories/productsRepository";

export const getProducts = async (): Promise<Product[]> => {
    // NOTE: Service function to fetch all products

  return await fetchAllProducts();
};

export const getProductById = async (id: number): Promise<Product> => {
  // NOTE: Service function to fetch a single product by ID

  return await fetchProduct(id);
};