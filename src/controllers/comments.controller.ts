import type { Request, Response } from 'express';
import { Post } from '@/db/models/article.model.ts';
import { Comment } from '@/db/models/comment.model.ts';

export const postAComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { post_id } = req.params;

  try {
    const isPostExist = await Post.getArticleById(post_id);

    if (!isPostExist) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    const commentDetails = {
      ...req.body,
      post_id: post_id,
    };
    const comment = await Comment.createComment(commentDetails);
    res.status(200).json({ message: 'Comment created successfully', comment });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error });
    return;
  }
};

export const getAllPostComments = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  try {
    const comments = await Comment.getAllCommentsByPostId(post_id);
    res
      .status(200)
      .json({ message: 'Comments fetched successfully', comments });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error });
    return;
  }
};
