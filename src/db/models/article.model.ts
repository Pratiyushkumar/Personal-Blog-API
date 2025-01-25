import { prisma } from '../connection.ts';
import type {
  articleCreationBody,
  articleUpdateBody,
  filterOption,
} from '@/interface/article.interface.ts';

export class Post {
  static async createArticle(post: articleCreationBody) {
    return prisma.posts.create({
      data: {
        title: post.title,
        content: post.content,
        author_id: post.author_id,
        slug: post.slug,
        featured_img_url: post.featured_img_url,
        postCategories: post.category_id
          ? {
              create: {
                category: {
                  connect: {
                    id: post.category_id,
                  },
                },
              },
            }
          : undefined,
      },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  static async getAllArticles(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.posts.findMany({
        skip,
        take: limit,
        include: {
          author: {
            select: {
              fullname: true,
              username: true,
            },
          },
          postCategories: {
            include: {
              category: true,
            },
          },
          postLikes: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.posts.count(),
    ]);

    return {
      posts,
      meta: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
        hasNextPage: total - skip - limit > 0,
        hasPrevPage: page > 1,
      },
    };
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

  static async filterArticles(options: filterOption) {
    // const where: any = {};
    const OR = [];

    if (options.searchQuery) {
      OR.push(
        { title: { contains: options.searchQuery } },
        {
          author: {
            fullname: { contains: options.searchQuery },
          },
        },
        {
          postCategories: {
            some: {
              category: {
                name: { contains: options.searchQuery },
              },
            },
          },
        }
      );
    }

    if (options.filters) {
      const { title, authorName, categoryName } = options.filters;

      if (title) {
        OR.push({ title: { contains: title } });
      }

      if (authorName) {
        OR.push({
          author: { fullname: { contains: authorName } },
        });
      }

      if (categoryName) {
        OR.push({
          postCategories: {
            some: {
              category: {
                name: { contains: categoryName },
              },
            },
          },
        });
      }
    }
    return prisma.posts.findMany({
      where: OR.length > 0 ? { OR } : {},
      include: {
        author: {
          select: {
            fullname: true,
            username: true,
          },
        },
        postCategories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
