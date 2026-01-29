import { Types } from "mongoose";

interface IGroceryItem {
  name: string;
  purchased: boolean;
}

export interface IGroceryList {
  userId: Types.ObjectId;
  weekStart: Date;
  items: IGroceryItem[];
}