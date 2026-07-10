import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import type { ApiResponse, HealthCheckResponse } from '@chatbot/shared';

export type GatewayConfig = {
    clientOrigin: string;
    chatServiceUrl: string;
};

export function createApp(config: GatewayConfig): Express {
    const app = express();

    app.use(
        cors({
            origin: config.clientOrigin,
            credentials: true,
        }),
    );
    app.use(
        '/chat',
        createProxyMiddleware({
            target: config.chatServiceUrl,
            changeOrigin: true,
        }),
    );
    app.use(express.json());

    app.get('/health', (_req: Request, res: Response<ApiResponse<HealthCheckResponse>>) => {
        const data: HealthCheckResponse = {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };

        res.status(200).json({ data });
    });

    return app;
};