import { Types } from "mongoose";

export type IMealPlanner = {
  userId: Types.ObjectId;
  weekStart: Date;
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  recipeId: Types.ObjectId;
  status: "planned" | "cooking" | "cooked";
};
