import type { Request, Response } from 'express';
import { Post } from '@/db/models/article.model.ts';
import { Users } from '@/db/models/users.model.ts';

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
    const getAllArticles = await Post.getAllArticles();
    if (!getAllArticles) {
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
