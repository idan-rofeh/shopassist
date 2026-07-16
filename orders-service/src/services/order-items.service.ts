import type { OrderItem, OrderItemSearchFilter } from '@chatbot/shared';
import { ORDER_ITEMS } from '../data/order-items';

export class OrderItemsService {
  public static async find(filter: OrderItemSearchFilter = {}): Promise<OrderItem[]> {
    return ORDER_ITEMS.filter((item) => {
      if (filter.id != null && item.id !== filter.id) {
        return false;
      }

      if (filter.orderId != null && item.orderId !== filter.orderId) {
        return false;
      }

      return true;
    });
  }
}
