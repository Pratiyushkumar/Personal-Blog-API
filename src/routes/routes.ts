import { Router } from 'express';
import authRouter from './auth.routes.ts';

const router: Router = Router();

router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;
