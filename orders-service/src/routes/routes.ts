import type { Request, Response } from 'express';
import { Router } from 'express';

import { asyncHandler } from '@chatbot/server-utils';
import type { OrderItemSearchFilter, OrderSearchFilter } from '@chatbot/shared';

import { OrderItemsService } from '../services/order-items.service';
import { OrdersService } from '../services/orders.service';

function parseOptionalNumber(value: unknown): number | undefined {
  if (value == null || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export const ordersRouter = Router();

ordersRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const filter: OrderSearchFilter = {
      id: parseOptionalNumber(req.query.id),
      userId: parseOptionalNumber(req.query.userId),
    };

    const response = await OrdersService.find(filter);
    res.status(200).json(response);
  }),
);

export const orderItemsRouter = Router();

orderItemsRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const filter: OrderItemSearchFilter = {
      id: parseOptionalNumber(req.query.id),
      orderId: parseOptionalNumber(req.query.orderId),
    };

    const response = await OrderItemsService.find(filter);
    res.status(200).json(response);
  }),
);
