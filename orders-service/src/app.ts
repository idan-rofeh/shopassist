import express, { type Express, type Request, type Response } from 'express';

import { ApiResponse, HealthCheckResponse } from '@chatbot/shared';

import { orderItemsRouter, ordersRouter } from './routes/routes';

export function createApp(): Express {
    const app: Express = express();
    app.use(express.json());

    app.get('/health', (_req: Request, res: Response<ApiResponse<HealthCheckResponse>>) => {
        const data: HealthCheckResponse = {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };

        res.status(200).json({ data });
    });

    app.use('/orders', ordersRouter);
    app.use('/order-items', orderItemsRouter);

    return app;
};