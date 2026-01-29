import { model, Schema } from "mongoose";
import { IGroceryList } from "./groceryList.type";

const groceryListSchema = new Schema<IGroceryList>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weekStart: { type: Date, required: true },
    items: [
      {
        name: { type: String, required: true },
        purchased: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

export const GroceryList = model<IGroceryList>(
  "GroceryList",
  groceryListSchema,
);
