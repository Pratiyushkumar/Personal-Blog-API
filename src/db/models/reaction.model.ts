import { prisma } from '../connection.ts';
import { ReactionType } from '@/interface/reaction.interface.ts';
import type { articleReaction } from '@/interface/reaction.interface.ts';

export class Reaction {
  static async createReaction(
    reaction: articleReaction,
    reactionType: ReactionType
  ) {
    let likeCount = 0;
    let dislikeCount = 0;
    if (reactionType === ReactionType.Like) {
      likeCount = 1;
    } else {
      dislikeCount = 1;
    }
    return prisma.postLikes.create({
      data: {
        post_id: reaction.article_id,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
      },
    });
  }

  static async getReactionByPostId(post_id: string) {
    return prisma.postLikes.findUnique({
      where: {
        post_id,
      },
    });
  }

  static async updatePostLikeOrDislike(
    post_id: string,
    reactionType: ReactionType
  ) {
    if (reactionType === ReactionType.Like) {
      return prisma.postLikes.update({
        where: {
          post_id,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });
    } else {
      return prisma.postLikes.update({
        where: {
          post_id,
        },
        data: {
          dislikeCount: {
            increment: 1,
          },
        },
      });
    }
  }
}
