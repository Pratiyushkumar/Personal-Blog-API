import { prisma } from '../connection.ts';
import type { articleCreationBody } from '@/interface/article.interface.ts';

export class Post {
  static async createArticle(post: articleCreationBody) {
    return prisma.posts.create({
      data: {
        ...post,
      },
    });
  }

  static async getAllArticles() {
    return prisma.posts.findMany();
  }

  static async getAuthorsArticle(author_id: string) {
    return prisma.posts.findMany({
      where: {
        author_id: author_id,
      },
    });
  }
}
