import { userSignup } from '@/controllers/auth.controller.ts';
import { validate } from '@/middleware/validateMiddleware.ts';
import { signupSchema } from '@/validations/auth.validation.ts';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/signup', validate({ body: signupSchema }), userSignup);

export default authRouter;
