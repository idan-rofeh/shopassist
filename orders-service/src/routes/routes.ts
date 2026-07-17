import type { Request, Response } from 'express';
import { Router } from 'express';

import { asyncHandler, validateQuery } from '@chatbot/server-utils';
import {
  OrderItemSearchFilter,
  OrderItemSearchFilterSchema,
  OrderSearchFilter,
  OrderSearchFilterSchema,
} from '@chatbot/shared';

import { OrderItemsService } from '../services/order-items.service';
import { OrdersService } from '../services/orders.service';
import { logger } from '../services/log.service';

export const ordersRouter = Router();

ordersRouter.get(
  '/',
  validateQuery(OrderSearchFilterSchema, logger),
  asyncHandler(async (req: Request, res: Response) => {
    const filter = req.query as OrderSearchFilter;

    const response = await OrdersService.find(filter);
    res.status(200).json(response);
  }),
);

export const orderItemsRouter = Router();

orderItemsRouter.get(
  '/',
  validateQuery(OrderItemSearchFilterSchema, logger),
  asyncHandler(async (req: Request, res: Response) => {
    const filter = req.query as OrderItemSearchFilter;

    const response = await OrderItemsService.find(filter);
    res.status(200).json(response);
  }),
);
