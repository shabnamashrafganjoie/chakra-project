export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  [key: string]: any; // اگر فیلد اضافی بود
}

export interface ProductState {
  loading: boolean;
  products: Product[];
  error: string | null;
}