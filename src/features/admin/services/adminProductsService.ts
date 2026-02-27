import { Product } from "@/features/admin/types/adminProduct.type";
import { fetchAllProducts } from "@/features/admin/repositories/adminProductsRepository";

export const getProducts = async (): Promise<Product[]> => {
    // NOTE: Service layer function that calls the repository
  // This acts as an intermediary between the Redux slice and the repository
  return await fetchAllProducts();
};
