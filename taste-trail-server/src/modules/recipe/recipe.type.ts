import { Types } from "mongoose";

export type IRecipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  categoryId: Types.ObjectId;
  cuisineId: Types.ObjectId;
  cookingTime: number;
  calories: number;
  image?: string;
};