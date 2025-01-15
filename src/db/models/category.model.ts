import type { categoryCreationBody } from '@/interface/category.interface.ts';
import { prisma } from '../connection.ts';

export class Category {
  static async createCategory(category: categoryCreationBody) {
    return prisma.categories.create({
      data: {
        ...category,
      },
    });
  }
}
