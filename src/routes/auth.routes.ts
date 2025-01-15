import { Router } from 'express';
import {
  userSigin,
  userSignout,
  userSignup,
} from '@/controllers/auth.controller.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import { signinSchema, signupSchema } from '@/validations/auth.validation.ts';
import { authMiddleware } from '@/middleware/authMiddleware.ts';

const authRouter: Router = Router();

authRouter.post('/signup', validate({ body: signupSchema }), userSignup);
authRouter.get(
  '/signin',
  authMiddleware,
  validate({ body: signinSchema }),
  userSigin
);
authRouter.get('/signout', authMiddleware, userSignout);

export default authRouter;
