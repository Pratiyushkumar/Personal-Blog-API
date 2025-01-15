import type { Request, Response } from 'express';
import { Category } from '@/db/models/category.model.ts';

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const requestBody = req.body;
  try {
    const category = await Category.createCategory(requestBody);
    console.log(category);

    res
      .status(200)
      .json({ message: 'Category created successfully', category });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
    return;
  }
};
