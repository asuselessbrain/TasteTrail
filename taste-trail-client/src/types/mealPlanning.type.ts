import { IRecipe } from "./recipe.type";

export type IMealPlan = {
  _id: string;
  userId: string;
  weekStart: string; 
  day: string; 
  status: "planned" | "cooking" | "cooked";
  recipeId: IRecipe;
  createdAt: string;
  updatedAt: string; 
  __v: number;
};
