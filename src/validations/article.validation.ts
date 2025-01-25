import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255).optional(),
  featured_img_url: z.string().url().optional(),
  content: z.string(),
  author_id: z.string().uuid(),
  category_id: z.string().uuid().optional(),
});

export const articleIdSchema = z.object({
  article_id: z.string().uuid(),
});

export const articleReactionBodySchema = z.object({
  reaction_type: z.enum(['like', 'dislike']),
});

export const articleQuerySchema = z.object({
  searchQuery: z.string().optional(),
  categoryName: z.string().uuid().optional(),
  authorName: z.string().uuid().optional(),
  title: z.string().optional(),
});

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1))
    .refine((val) => val > 0, { message: 'Page must be greater than 0' }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10))
    .refine((val) => val > 0, { message: 'Limit must be greater than 0' }),
});