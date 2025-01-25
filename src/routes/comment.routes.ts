import { Router } from 'express';
import { authMiddleware } from '@/middleware/authMiddleware.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import {
  getAllPostComments,
  postAComment,
} from '@/controllers/comments.controller.ts';
import {
  createCommentBodySchema,
  createCommentParamsSchema,
} from '@/validations/comment.validation.ts';

const commentRouter: Router = Router();

commentRouter.post(
  '/:post_id',
  validate({
    params: createCommentParamsSchema,
    body: createCommentBodySchema,
  }),
  postAComment
);

commentRouter.get(
  '/:post_id',
  authMiddleware,
  validate({ params: createCommentParamsSchema }),
  getAllPostComments
);

export default commentRouter;
