
import type { Request, Response } from 'express';

import { Router } from 'express';
import { asyncHandler } from "@chatbot/server-utils";
import { CategoriesService } from '../services/categories/categories.service';

const router = Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const response = await CategoriesService.searchCategories(req.query);

    res.status(200).json(response);
}));

export default router;