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
    filters: { userId: user._id.toString(), ...query.filters },
    search: query.search,
    searchFields: ["day"],
    searchInPopulate: [
      { path: "recipeId", field: "name" },  
      { path: "recipeId.categoryId", field: "name" },
      { path: "recipeId.cuisineId", field: "name" }, 
    ],
    sortBy: query.sortBy || "cookedDate",
    sortOrder: query.sortOrder || "desc",
    page: query.page,
    limit: query.limit,
    populate: ["recipeId", "recipeId.categoryId", "recipeId.cuisineId"],
    populateCollectionNames: {
      "recipeId": "recipes",
      "recipeId.categoryId": "categories",
      "recipeId.cuisineId": "cuisines",
    },
  });

  return history;
};

export const cookingHistoryServices = {
  getMyCookingHistory,
};
