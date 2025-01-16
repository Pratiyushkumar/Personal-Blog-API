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

  static async getCategory(param: string) {
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        param
      );
    return prisma.categories.findUnique({
      where: isUUID ? { id: param } : { name: param },
    });
  }
}
