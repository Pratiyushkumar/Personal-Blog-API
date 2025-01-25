import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@/utils/jwt.ts';
import { SessionService } from '@/db/models/auth.model.ts';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('authorization') || req.cookies['blogToken'];

    console.log('token***', token);

    if (!token) {
      res.status(401).json({ message: 'Authentication token is missing' });
      return;
    }

    const session = await SessionService.findValidSession(token);
    if (!session) {
      res.clearCookie('blogToken');
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      await SessionService.invalidateSession(token);
      res.clearCookie('blogToken');
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    req.user = decodedToken;
    req.token = token;
    next();
  } catch (error) {
    console.error('Error verifying authentication token:', error);
    res.clearCookie('blogToken');
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
