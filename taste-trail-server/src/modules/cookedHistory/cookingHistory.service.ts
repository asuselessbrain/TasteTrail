import { queryBuilder } from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { CookingHistory } from "./cookedHIstory.model";

const getMyCookingHistory = async (
  email: string,
  query: Record<string, any>,
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const history = await queryBuilder(CookingHistory, {
    filters: { userId: user._id, ...query.filters },
    search: query.search,
    searchFields: [],
    sortBy: "cookedDate",
    sortOrder: "desc",
    populate: {
      path: "recipeId",
      populate: [{ path: "categoryId" }, { path: "cuisineId" }],
    },
  });

  return history;
};

export const cookingHistoryServices = {
  getMyCookingHistory,
};
