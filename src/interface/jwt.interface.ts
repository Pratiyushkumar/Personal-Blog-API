import type { JwtPayload } from 'jsonwebtoken';
import type { Session } from '@prisma/client';

export {};

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
    token?: string;
    session?: Session;
  }
}
