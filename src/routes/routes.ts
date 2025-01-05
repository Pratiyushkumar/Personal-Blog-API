import { Router } from 'express';
import authRouter from './auth.routes.ts';
import articleRoute from './article.routes.ts';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/article', articleRoute);

router.get('/', (req, res) => {
  res.send('Hello World! lets go...');
});

export default router;
