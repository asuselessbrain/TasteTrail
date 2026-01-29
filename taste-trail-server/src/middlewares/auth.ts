import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/auth/auth.type';
import { User } from '../modules/auth/auth.model';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.jwt.token_secret as string) as JwtPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new AppError(401, 'You are not authorized!');
    }

    const { role, email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(404, 'This user is not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized');
    }

    req.user = user;
    next();
  });
};

export default auth;
