import { Types } from "mongoose";

export type IFavorite = {
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
};