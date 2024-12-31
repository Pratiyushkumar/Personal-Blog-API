import type { SignupRequestBody } from '@/interface/auth.interface.ts';
import { prisma } from '../connection.ts';
import { hashPassword } from '@/utils/auth.ts';

export class Users {
  static async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  static async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  static async createUser(userData: SignupRequestBody) {
    const hashedPassword = await hashPassword(userData.password);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        fullname: userData.fullname,
        username: userData.username,
      },
    });
    return user;
  }
}
