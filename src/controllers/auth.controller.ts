import { Users } from '@/db/models/users.model.ts';
import type { SignupRequestBody } from '@/interface/auth.interface.ts';
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
    res.status(500).json({ message: 'Server error: Something went wrong!' });
  }
};
