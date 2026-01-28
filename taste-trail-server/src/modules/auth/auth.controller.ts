import { Request, Response } from 'express';
import { responser } from '../../utils/responser';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const register = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await AuthService.register(req.body);

  responser(res, {
    statusCode: 201,
    message: 'Registration Successful',
    data: {
      email: result,
    },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie('accessToken', result?.token, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
  });

  responser(res, {
    statusCode: 200,
    message: 'Login Successful',
    data: result,
  });
});


export const AuthControllers = {
  register,
  login
};
