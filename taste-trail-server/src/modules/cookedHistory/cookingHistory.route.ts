import express from "express";
import { cookingHistoryController } from "./cookingHistory.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/user.contant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.user),
  cookingHistoryController.getAllCookingHistory,
);

export const cookingHistoryRoutes = router;
