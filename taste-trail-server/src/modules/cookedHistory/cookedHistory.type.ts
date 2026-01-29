import { Types } from "mongoose";

export type ICookingHistory = {
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
  cookedDate: Date;
  weekStart?: Date;
  day:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
};
