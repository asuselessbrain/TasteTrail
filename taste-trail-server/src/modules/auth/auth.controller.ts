import { Request, Response } from "express";
import { responser } from "../../utils/responser";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import config from "../../config";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  responser(res, {
    statusCode: 201,
    message: "Registration Successful",
    data: {
      email: result,
    },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie("accessToken", result?.token, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: config.node_env === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    path: "/",
  });

  responser(res, {
    statusCode: 200,
    message: "Login Successful",
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.logout();

  res.clearCookie("accessToken", {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: config.node_env === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,
    path: "/",
  });

  responser(res, {
    statusCode: 200,
    message: "Logout successful",
    data: result,
  });
});

const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AuthService.getCurrentUser(user?.email);

  responser(res, {
    statusCode: 200,
    message: "Current user retrieved successfully",
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
  logout,
  getCurrentUser,
};
