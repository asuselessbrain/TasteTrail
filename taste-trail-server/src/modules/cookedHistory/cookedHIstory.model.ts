import { Schema, model, models } from "mongoose";
import { ICookingHistory } from "./cookedHistory.type";

const CookingHistorySchema = new Schema<ICookingHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },

    cookedDate: {
      type: Date,
      required: true,
    },

    weekStart: {
      type: Date,
      required: false,
    },

    day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CookingHistory = model<ICookingHistory>("CookingHistory", CookingHistorySchema);