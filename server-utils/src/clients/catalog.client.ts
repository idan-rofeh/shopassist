import type {
  Category,
  CategorySearchFilter,
  Product,
  ProductSearchFilter,
} from '@chatbot/shared';

import { ServiceName } from '../enums';
import { HttpClient } from '../services';
import { BaseClient } from './base.client';

export class CatalogClient extends BaseClient {
  static readonly serviceName = ServiceName.CATALOG;
  static readonly envKey = 'CATALOG_SERVICE_URL';

  // available services for caller 
  static readonly allowedList: ServiceName[] = [
    ServiceName.CHAT,
    ServiceName.GATEWAY,
  ];

  constructor(private readonly http: HttpClient) {
    super(
      CatalogClient.serviceName,
      CatalogClient.envKey,
      CatalogClient.allowedList,
    );
  };

  async searchProducts(filter: ProductSearchFilter = {}): Promise<Product[]> {
    return this.http.send<Product[]>({
      url: `${this.baseUrl}/products`,
      method: 'GET',
      params: filter as Record<string, unknown>,
    });
  };

  async searchCategories(
    filter: CategorySearchFilter = {},
  ): Promise<Category[]> {
    return this.http.send<Category[]>({
      url: `${this.baseUrl}/categories`,
      method: 'GET',
      params: filter as Record<string, unknown>,
    });
  };
};
