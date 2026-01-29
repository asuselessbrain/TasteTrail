import { IRecipe } from "./recipe.type";

export interface IUserRecipe {
  _id?: string;
  userId: string;
  recipeId: IRecipe;
  createdAt: string;
  updatedAt: string;
}