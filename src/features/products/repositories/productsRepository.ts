import { Product } from "../types/product.types";

export const fetchAllProducts = async (): Promise<Product[]> => {
    // NOTE: Fetching all products from dummy JSON API

  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products || [];// NOTE: Return empty array if products property doesn't exist
};



export const fetchProduct = async (id: number): Promise<Product> => {
    // NOTE: Fetching a single product by ID from dummy JSON API

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data: Product = await res.json();
  return data;
};