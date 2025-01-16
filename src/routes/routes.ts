import { Router } from 'express';
import authRouter from './auth.routes.ts';
import articleRoute from './article.routes.ts';
import categoryRouter from './category.routes.ts';
import commentRouter from './comment.routes.ts';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/article', articleRoute);
router.use('/category', categoryRouter);
router.use('/comments', commentRouter);

router.get('/', (req, res) => {
  res.send('Hello World! lets go...');
});

export default router;
