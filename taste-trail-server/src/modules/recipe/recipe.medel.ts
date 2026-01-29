import { Schema, model, Types } from "mongoose";
import { IRecipe } from "./recipe.type";


const recipeSchema = new Schema<IRecipe>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
      validate: [(val: string[]) => val.length > 0, "Ingredients required"],
    },
    instructions: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    cuisineId: {
      type: Schema.Types.ObjectId,
      ref: "Cuisine",
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
      min: [1, "Cooking time must be at least 1 minute"],
    },
    calories: {
      type: Number,
      required: true,
      min: [1, "Calories must be a positive number"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = model<IRecipe>("Recipe", recipeSchema);
