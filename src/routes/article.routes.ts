import { Router } from 'express';
import { authMiddleware } from '@/middleware/authMiddleware.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import { createArticleSchema } from '@/validations/article.validation.ts';
import {
  createArticle,
  getAllArticles,
  getArticleByUserId,
} from '@/controllers/article.controller.ts';

const articleRoute: Router = Router();

articleRoute.post(
  '/',
  authMiddleware,
  validate({ body: createArticleSchema }),
  createArticle
);

articleRoute.get('/', authMiddleware, getAllArticles);

articleRoute.get('/:user_id', authMiddleware, getArticleByUserId);

export default articleRoute;
