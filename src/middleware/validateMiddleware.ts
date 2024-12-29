import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodSchema, z } from 'zod';

export const validate = (schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'),
        }));
        res.status(400).json({
          message: 'Invalid Request',
          errors: formattedErrors,
        });
        return;
      }
      next(error);
    }
  };
};
