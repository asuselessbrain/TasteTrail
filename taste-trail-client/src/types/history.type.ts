import { IRecipe } from "./recipe.type";

export interface ICookingHistory {
  _id?: string;
  userId: string;
  recipeId: IRecipe;
  day: string;
  cookedDate: string;
  weekStart: string;
  createdAt: string;
  updatedAt: string;
}