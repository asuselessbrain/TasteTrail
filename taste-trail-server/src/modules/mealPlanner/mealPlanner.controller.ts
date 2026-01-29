import { catchAsync } from "../../utils/catchAsync";
import { responser } from "../../utils/responser";
import { mealPlannerServices } from "./mealPlanner.service";

const addMealPlan = catchAsync(async (req, res) => {
  const user = req.user;
  const mealPlanData = req.body;
  const result = await mealPlannerServices.addMealPlan(
    user?.email,
    mealPlanData,
  );
  responser(res, {
    statusCode: 201,
    message: "Meal plan added successfully",
    data: result,
  });
});

const getMealPlansByUser = catchAsync(async (req, res) => {
  const user = req.user;
  const { weekStart } = req.query;
  const result = await mealPlannerServices.getMealPlansByUser(
    user?.email,
    new Date(weekStart as string),
  );
  responser(res, {
    statusCode: 200,
    message: "Meal plans retrieved successfully",
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await mealPlannerServices.updateStatus(id as string, status);
  responser(res, {
    statusCode: 200,
    message: "Meal plan status updated successfully",
    data: result,
  });
});


export const mealPlannerController = {
  addMealPlan,
  getMealPlansByUser,
  updateStatus
};
