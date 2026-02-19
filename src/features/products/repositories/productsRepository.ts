import { Product } from "../types/product.types";

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products || [];
};



export const fetchProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data: Product = await res.json();
  return data;
};