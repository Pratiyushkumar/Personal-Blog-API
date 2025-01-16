import { z } from 'zod';

export const createCommentParamsSchema = z.object({
  post_id: z.string().uuid(),
});

export const createCommentBodySchema = z.object({
  user_id: z.string().uuid(),
  description: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(2000, 'Comment cannot exceed 2000 characters')
    .trim(),
});