import { createCategory } from '@/controllers/category.controller.ts';
import { authMiddleware } from '@/middleware/authMiddleware.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import { createCategorySchema } from '@/validations/category.validation.ts';
import { Router } from 'express';

const categoryRouter: Router = Router();

categoryRouter.post(
  '/',
  authMiddleware,
  validate({ body: createCategorySchema }),
  createCategory
);

export default categoryRouter;
