import { Schema, model, Types } from "mongoose";
import { IReview } from "./review.type";


const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    recipeId: { type: Types.ObjectId, ref: "Recipe", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Review = model<IReview>("Review", ReviewSchema);
