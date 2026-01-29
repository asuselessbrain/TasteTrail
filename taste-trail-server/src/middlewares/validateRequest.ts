import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { catchAsync } from '../utils/catchAsync';

const validateRequest = (schema: ZodSchema<any>) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
