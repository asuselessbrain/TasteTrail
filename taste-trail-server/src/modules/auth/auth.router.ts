import { NextFunction, Router } from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';

const authRouter = Router();

authRouter.post(
  '/',
  validateRequest(AuthValidation.userValidationSchema),
  AuthControllers.register,
);

// authRouter.post(
//   '/login',
//   validateRequest(AuthValidation.loginValidationSchema),
//   AuthControllers.login,
// );
export default authRouter;
