import type { Session } from '@prisma/client';
import ms from 'ms';
import { prisma } from '../connection.ts';

export class SessionService {
  static async createSession(
    userId: string,
    token: string,
    expiresIn: string
  ): Promise<Session> {
    const expiresInMs = ms(expiresIn);
    return prisma.session.create({
      data: {
        user_id: userId,
        token,
        expired_at: new Date(Date.now() + expiresInMs),
      },
    });
  }

  static async findValidSession(token: string): Promise<Session | null> {
    return prisma.session.findFirst({
      where: {
        token,
        expired_at: {
          gt: new Date(),
        },
      },
    });
  }

  static async invalidateSession(token: string): Promise<void> {
    await prisma.session.update({
      where: {
        token,
      },
      data: { expired_at: new Date() },
    });
  }

  static async invalidateAllUserSessions(userId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { user_id: userId },
      data: { expired_at: new Date() },
    });
  }
}
