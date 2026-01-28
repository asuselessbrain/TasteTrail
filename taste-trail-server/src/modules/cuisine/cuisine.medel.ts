import { Schema, model } from "mongoose";
import { ICuisine } from "./cuisine.type";

const cuisineSchema = new Schema<ICuisine>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cuisine = model<ICuisine>("Cuisine", cuisineSchema);