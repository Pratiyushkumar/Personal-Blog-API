import { SessionService } from '@/db/models/auth.model.ts';
import { Users } from '@/db/models/users.model.ts';
import type {
  SigninRequestBody,
  SignupRequestBody,
} from '@/interface/auth.interface.ts';
import { verifyPassword } from '@/utils/auth.ts';
import { generateToken } from '@/utils/jwt.ts';
import type { Request, Response } from 'express';

export const userSignup = async (
  req: Request<object, object, SignupRequestBody>,
  res: Response
): Promise<void> => {
  const reqBody = req.body;
  console.log(reqBody);
  try {
    const checkIfUserExists = await Users.findByEmail(reqBody.email);
    if (checkIfUserExists) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const user = await Users.createUser(reqBody);
    const token = generateToken({ userId: user.id, email: user.email });
    console.log(user);

    const userSession = await SessionService.createSession(
      user.id,
      token,
      '1d'
    );

    if (!userSession) {
      res.status(500).json({ message: 'Server error: Something went wrong!' });
      return;
    }

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
  }
};

export const userSigin = async (
  req: Request<object, object, SigninRequestBody>,
  res: Response
): Promise<void> => {
  const reqBody = req.body;
  try {
    let user;
    if (reqBody.email && reqBody.username) {
      res.status(400).json({ message: 'Provide either email or username' });
      return;
    }

    if (reqBody.email) {
      user = await Users.findByEmail(reqBody.email);
    } else if (reqBody.username) {
      user = await Users.findByUsername(reqBody.username);
    }

    if (!user) {
      res.status(404).json({ message: 'User not found', error: user });
      return;
    }

    const password = verifyPassword(reqBody.password, user.password);
    if (!password) {
      res.status(401).json({ message: 'Invalid credentials', error: password });
      return;
    }

    res.status(200).json({
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
  }
};

export const userSignout = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.header('authorization');
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await SessionService.invalidateSession(token);

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server error: Something went wrong!', error: error });
  }
};
