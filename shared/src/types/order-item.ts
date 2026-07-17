import { z } from 'zod';

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date | null;
}

export const OrderItemSearchFilterSchema = z.object({
    id: z.string().optional(),
    orderId: z.string().optional(),
}).refine(data => data.id || data.orderId, {
    message: "Either 'id' or 'user' is required.",
  });;

export type OrderItemSearchFilter = z.infer<typeof OrderItemSearchFilterSchema>;