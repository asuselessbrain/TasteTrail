import { Schema, model, Types } from "mongoose";
import { IFavorite } from "./favorite.type";


const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    recipeId: { type: Types.ObjectId, ref: "Recipe", required: true },
  },
  { timestamps: true }
);

export const Favorite = model<IFavorite>("Favorite", FavoriteSchema);
