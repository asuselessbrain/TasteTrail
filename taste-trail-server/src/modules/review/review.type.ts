import { Types } from "mongoose";

export type IReview = {
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
};