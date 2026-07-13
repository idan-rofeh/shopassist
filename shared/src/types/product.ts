export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
};

export interface ProductSearchFilter {
  name?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};