import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255).optional(),
  featured_img_url: z.string().url().optional(),
  content: z.string(),
  author_id: z.string().uuid(),
  category_id: z.string().uuid().optional(),
});
