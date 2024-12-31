import { verifyToken } from '@/utils/jwt.ts';
import type { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('authorization');

    if (!token) {
      res.status(401).json({ message: 'Authentication token is missing' });
      return;
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
