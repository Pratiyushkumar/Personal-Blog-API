import { Router } from 'express';
import { authMiddleware } from '@/middleware/authMiddleware.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import {
  articleIdSchema,
  articleReactionBodySchema,
  createArticleSchema,
} from '@/validations/article.validation.ts';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleByUserId,
  getArticleReactionDetails,
  likeDislikeArticle,
  updateArticle,
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

articleRoute.put('/:article_id', authMiddleware, updateArticle);

articleRoute.delete('/:article_id', authMiddleware, deleteArticle);

articleRoute.post(
  '/:article_id/reaction',
  authMiddleware,
  validate({ params: articleIdSchema, body: articleReactionBodySchema }),
  likeDislikeArticle
);

articleRoute.get('/:article_id/reaction/count', authMiddleware, validate({ params: articleIdSchema }),getArticleReactionDetails);

export default articleRoute;
