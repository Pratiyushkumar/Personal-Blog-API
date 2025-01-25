import type { Request, Response } from 'express';
import { Post } from '@/db/models/article.model.ts';
import { Users } from '@/db/models/users.model.ts';
import { Reaction } from '@/db/models/reaction.model.ts';
import type { filterOption } from '@/interface/article.interface.ts';

export const createArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const requestBody = req.body;
  try {
    const article = await Post.createArticle(requestBody);
    console.log(article);
    res.status(200).json({ message: 'Article created successfully', article });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
    return;
  }
};

export const getAllArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      res.status(400).json({ message: 'Invalid page or limit' });
      return;
    }
    const getAllArticles = await Post.getAllArticles(page, limit);
    if (!getAllArticles.posts.length) {
      res.status(404).json({ message: 'No articles found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Articles fetched successfully', getAllArticles });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
  }
  return;
};

export const getArticleByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const isUser = await Users.findUserById(user_id);
    if (!isUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const article = await Post.getAuthorsArticle(user_id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.status(200).json({ message: 'Article fetched successfully', article });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error });
    return;
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { article_id } = req.params;

  try {
    const article = await Post.getArticleById(article_id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    const updatedArticle = await Post.updateArticleById(article_id, req.body);

    res.status(200).json({
      message: 'Article updated successfully',
      updatedArticle,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { article_id } = req.params;
  try {
    const article = await Post.getArticleById(article_id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    const deletedArticle = await Post.deleteArticleById(article_id);

    res.status(200).json({
      message: 'Article deleted successfully',
      deletedArticle,
    });
  } catch (error) {
    console.log('error in delete article', error);
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error });
  }
};

export const likeDislikeArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { article_id } = req.params;

    console.log('article id in controller', article_id);

    const articleFromPost = await Post.getArticleById(article_id);
    if (!articleFromPost) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    const { reaction_type } = req.body;
    const article = await Reaction.getReactionByPostId(article_id);

    if (!article) {
      const reactionCreation = await Reaction.createReaction(
        { article_id },
        reaction_type
      );

      res.status(200).json({
        message: 'Reaction created successfully',
        reactionCreation,
      });
      return;
    }

    const updateReaction = await Reaction.updatePostLikeOrDislike(
      article_id,
      reaction_type
    );
    res.status(200).json({
      message: 'Reaction updated successfully',
      updateReaction,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error });
    return;
  }
};

export const getArticleReactionDetails = async (
  req: Request,
  res: Response
) => {
  const { article_id } = req.params;

  try {
    const articleReactionDetails =
      await Reaction.getReactionByPostId(article_id);

    if (!articleReactionDetails) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.status(200).json({
      message: 'Reaction details fetched successfully',
      articleReactionDetails,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error });
    return;
  }
};

export const filterArticles = async (req: Request, res: Response) => {
  console.log('filterArticles controller called');
  try {
    const { searchQuery, title, authorName, categoryName } = req.query;

    const filterOptions: filterOption = {
      searchQuery: searchQuery as string,
      filters: {
        title: title as string,
        authorName: authorName as string,
        categoryName: categoryName as string,
      },
    };

    Object.keys(filterOptions).forEach((key) => {
      const typedKey = key as keyof filterOption;
      if (filterOptions[typedKey] === undefined) {
        delete filterOptions[typedKey];
      }
    });

    const articles = await Post.filterArticles(filterOptions);

    if (!articles) {
      res.status(404).json({ message: 'No articles found' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Articles fetched successfully', articles });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
  }
};
