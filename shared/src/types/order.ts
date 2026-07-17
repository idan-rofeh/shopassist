import { z } from 'zod';

export interface Order {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export const OrderSearchFilterSchema = z
  .object({
    id: z.string().optional(),
    userId: z.string().optional(),
  })
  .refine(data => data.id || data.userId, {
    message: "Either 'id' or 'user' is required.",
  });

export type OrderSearchFilter = z.infer<typeof OrderSearchFilterSchema>;