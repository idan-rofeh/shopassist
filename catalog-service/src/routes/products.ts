
import type { Request, Response } from 'express';

import { Router } from 'express';
import { asyncHandler } from "@chatbot/server-utils";
import { ProductsService } from '../services/products/products.service';

const router = Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const response = await ProductsService.searchProducts(req.query);

    res.status(200).json(response);
}));

export default router;