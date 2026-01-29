import { Schema, model, Types } from "mongoose";
import { IMealPlanner } from "./mealPlanner.type";

const mealPlannerSchema = new Schema<IMealPlanner>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekStart: {
      type: Date,
      required: true,
    },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    status: {
      type: String,
      enum: ["planned", "cooking", "cooked"],
      default: "planned",
    },
  },
  {
    timestamps: true,
  }
);

export const MealPlanner = model<IMealPlanner>("MealPlanner", mealPlannerSchema);
