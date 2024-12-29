import express, { type Express, json, urlencoded } from 'express';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import router from '@/routes/routes.ts';

const createServer = (): Express => {
  const app = express();

  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
  };

  // Configure base middleware
  app.disable('x-powered-by');
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '1mb' }));
  app.use(cors(corsOptions));
  app.use(cookieParser());

  // API routes
  app.use('/v1', router);

  // 404 handler
  app.use('*', (_req, res) => {
    res.status(404).json({ message: `Not Found - ${_req.originalUrl}` });
  });

  // Server Error handler
  app.use((err: Error, _req: express.Request, res: express.Response) => {
    res.status(500).json({ message: 'Something Went Wrong' });
  });

  return app;
};

export default createServer;
