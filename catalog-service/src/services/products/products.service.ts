import type { Product, ProductSearchFilter } from '@chatbot/shared';
import { PRODUCTS } from '../../data/products';

export class ProductsService {
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
