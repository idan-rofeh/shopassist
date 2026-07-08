import type { Product } from '@chatbot/shared';
import { PRODUCTS } from '../data/products';

export interface ProductSearchFilter {
  name?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};

export class ProductService {
  public static async searchProducts(filter: ProductSearchFilter = {}): Promise<Product[]> {
    const name = filter.name?.trim().toLowerCase();
    const categoryId = filter.categoryId?.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      if (name && !product.name.toLowerCase().includes(name)) {
        return false;
      };

      if (categoryId && product.categoryId.toLowerCase() !== categoryId) {
        return false;
      };

      if (filter.minPrice != null && product.price < filter.minPrice) {
        return false;
      };

      if (filter.maxPrice != null && product.price > filter.maxPrice) {
        return false;
      };

      return true;
    });
  }
}
