import { prisma } from '../connection.ts';
import type {
  articleCreationBody,
  articleUpdateBody,
} from '@/interface/article.interface.ts';

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

  static async getArticleById(id: string) {
    return prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async updateArticleById(id: string, post: articleUpdateBody) {
    return prisma.posts.update({
      where: {
        id: id,
      },
      data: {
        ...post,
      },
    });
  }

  static async deleteArticleById(id: string) {
    return prisma.posts.delete({
      where: {
        id: id,
      },
    });
  }
}
