import type { commentDetails } from '@/interface/comment.interface.ts';
import { prisma } from '../connection.ts';

export class Comment {
  static async createComment(comment: commentDetails) {
    return prisma.comments.create({
      data: {
        ...comment,
      },
    });
  }

  static async getAllCommentsByPostId(post_id: string) {
    return prisma.comments.findMany({
      where: {
        post_id: post_id,
      },
    });
  }
}
