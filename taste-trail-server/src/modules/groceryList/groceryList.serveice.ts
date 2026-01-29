import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { MealPlanner } from "../mealPlanner/mealPlanner.model";
import { GroceryList } from "./groceryList.model";

function getCurrentWeekStart(): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

const generateGroceryList = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const currentWeekStart = getCurrentWeekStart();

  const threeWeeksLater = new Date(currentWeekStart);
  threeWeeksLater.setDate(currentWeekStart.getDate() + 7 * 3);

  const mealPlans = await MealPlanner.find({
    userId: user._id,
    weekStart: { $gte: currentWeekStart, $lte: threeWeeksLater },
  }).populate("recipeId");

  const ingredientSet = new Set<string>();

  for (const mealPlan of mealPlans) {
    const recipe = mealPlan.recipeId as unknown as { ingredients: string[] };
    if (!recipe || !recipe.ingredients) continue;

    for (const ingredient of recipe.ingredients) {
      ingredientSet.add(ingredient.trim().toLowerCase());
    }
  }

  const items = Array.from(ingredientSet).map((name) => ({
    name,
    purchased: false,
  }));

  const existingList = await GroceryList.findOne({
    userId: user._id,
    weekStart: currentWeekStart,
  });

  if (existingList) {
    return existingList;
  } else {
    const newList = await GroceryList.create({
      userId: user._id,
      weekStart: currentWeekStart,
      items,
    });
    return newList;
  }
};

const makeGroceryListPurchased = async (
  email: string,
  ingredientName: string,
) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, "User not found");

  const currentWeekStart = getCurrentWeekStart();

  const result = await GroceryList.updateOne(
    { userId: user._id, weekStart: currentWeekStart },
    { $set: { "items.$[elem].purchased": true } },
    { arrayFilters: [{ "elem.name": ingredientName.toLowerCase().trim() }] },
  );

  if (result.modifiedCount === 0) {
    throw new AppError(404, "Item not found or already purchased");
  }

  const updatedGroceryList = await GroceryList.findOne({
    userId: user._id,
    weekStart: currentWeekStart,
  });

  console.log(updatedGroceryList);

  return updatedGroceryList;
};

export const groceryListServices = {
  generateGroceryList,
  makeGroceryListPurchased,
};
