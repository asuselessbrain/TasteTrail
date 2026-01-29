import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { MealPlanner } from "./mealPlanner.model";
import { IMealPlanner } from "./mealPlanner.type";

const addMealPlan = async (email: string, mealPlanData: IMealPlanner) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const exists = await MealPlanner.findOne({
    userID: user._id,
    day: mealPlanData.day,
    weekStart: mealPlanData.weekStart,
  });

  if (exists) {
    throw new AppError(400, "Meal plan for this day already exists");
  }

  mealPlanData.userId = user._id;
  const mealPlan = new MealPlanner(mealPlanData);
  return await mealPlan.save();
};

const getMealPlansByUser = async (email: string, weekStart: Date) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const mealPlans = await MealPlanner.find({
    userId: user._id,
    weekStart,
  }).populate("recipeId");

  return mealPlans;
};

const updateStatus = async (
  id: string,
  status: "planned" | "cooking" | "cooked",
) => {
  const mealPlan = await MealPlanner.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  return mealPlan;
};

export const mealPlannerServices = {
  addMealPlan,
  getMealPlansByUser,
  updateStatus,
};
