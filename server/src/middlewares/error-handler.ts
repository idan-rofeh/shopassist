import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(`Uncaught exception: ${err}`);
    const status = err?.status || 500;

    res.status(status).json({
        error: err?.message || err || 'Internal server error'
    });
};