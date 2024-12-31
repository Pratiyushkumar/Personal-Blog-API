import { Router } from 'express';
import { userSigin, userSignup } from '@/controllers/auth.controller.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import { signupSchema } from '@/validations/auth.validation.ts';
import { authMiddleware } from '@/middleware/authMiddleware.ts';

const authRouter: Router = Router();

authRouter.post('/signup', validate({ body: signupSchema }), userSignup);
authRouter.get('/signin', authMiddleware, userSigin);

export default authRouter;
