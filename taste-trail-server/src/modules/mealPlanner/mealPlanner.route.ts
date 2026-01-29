import express from "express";
import { mealPlannerController } from "./mealPlanner.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/user.contant";

const router = express.Router();

router.post("/", auth(USER_ROLE.user), mealPlannerController.addMealPlan);
router.get("/", auth(USER_ROLE.user), mealPlannerController.getMealPlansByUser);
router.patch("/status/:id", auth(USER_ROLE.user), mealPlannerController.updateStatus);

export const mealPlannerRoutes = router;
