import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.contant";

const authRouter = Router();

authRouter.post(
  "/",
  validateRequest(AuthValidation.userValidationSchema),
  AuthControllers.register,
);

authRouter.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

authRouter.get("/logout", AuthControllers.logout);

authRouter.get(
  "/user",
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.getCurrentUser,
);

export default authRouter;
