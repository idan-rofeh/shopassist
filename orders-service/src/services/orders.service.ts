import type { Order, OrderSearchFilter } from '@chatbot/shared';
import { ORDERS } from '../data/orders';

export class OrdersService {
  public static async find(filter: OrderSearchFilter = {}): Promise<Order[]> {
    return ORDERS.filter((order) => {
      if (filter.id != null && order.id !== filter.id) {
        return false;
      }

      if (filter.userId != null && order.userId !== filter.userId) {
        return false;
      }

      return true;
    });
  }
}
