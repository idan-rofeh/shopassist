import type {
  Order,
  OrderItem,
  OrderItemSearchFilter,
  OrderSearchFilter,
} from '@chatbot/shared';

import { ServiceName } from '../enums';
import { HttpClient } from '../services';
import { BaseClient } from './base.client';

export class OrdersClient extends BaseClient {
  static readonly serviceName = ServiceName.ORDERS;
  static readonly envKey = 'ORDERS_SERVICE_URL';

  static readonly allowedList: ServiceName[] = [
    ServiceName.CHAT,
  ];

  constructor(private readonly http: HttpClient) {
    super(
      OrdersClient.serviceName,
      OrdersClient.envKey,
      OrdersClient.allowedList,
    );
  }

  readonly orders = {
    search: async (filter: OrderSearchFilter = {}): Promise<Order[]> => {
      return this.http.send<Order[]>({
        url: `${this.baseUrl}/orders`,
        method: 'GET',
        params: filter as Record<string, unknown>,
      });
    },
  };

  readonly orderItems = {
    search: async (filter: OrderItemSearchFilter = {}): Promise<OrderItem[]> => {
      return this.http.send<OrderItem[]>({
        url: `${this.baseUrl}/order-items`,
        method: 'GET',
        params: filter as Record<string, unknown>,
      });
    },
  };
}
