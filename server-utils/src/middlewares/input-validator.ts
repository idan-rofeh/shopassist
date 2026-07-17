import type { NextFunction, Request, Response } from 'express';
import type { z } from 'zod';

import type { Logger } from '../services';

export const validateQuery = <T extends z.ZodType>(schema: T, logger: Logger) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      logger.error(result.error, 'Query validation failed');

      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten(),
      });
    }

    req.query = result.data as typeof req.query;
    next();
  };
};
