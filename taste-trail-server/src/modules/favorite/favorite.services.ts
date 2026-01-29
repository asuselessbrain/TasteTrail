import { Types } from "mongoose";
import { queryBuilder } from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { IFavorite } from "./favorite.type";
import { Favorite } from "./favorite.medel";

const createFavorite = async (email: string, data: IFavorite) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isFavoriteExist = await Favorite.findOne({
    userId: user._id,
    recipeId: data.recipeId,
  });

  if (isFavoriteExist) {
    throw new AppError(400, "Recipe already in favorites");
  }

  data.userId = user._id;
  const favorite = new Favorite(data);

  return await favorite.save();
};

const getMyFavorite = async (email: string, options: Record<string, any>) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const { search, sortBy, sortOrder, page, limit } = options;

  return await queryBuilder(Favorite, {
    filters: { userId: user._id.toString() },
    search,
    searchFields: [],
    searchInPopulate: [
      { path: "recipeId", field: "name" },
      { path: "recipeId.categoryId", field: "name" },
      { path: "recipeId.cuisineId", field: "name" },
    ],
    sortBy,
    sortOrder,
    page,
    limit,
    populate: ["recipeId", "recipeId.categoryId", "recipeId.cuisineId"],
    populateCollectionNames: {
      recipeId: "recipes",
      "recipeId.categoryId": "categories",
      "recipeId.cuisineId": "cuisines",
    },
  });
};

const getAlreadyFavorite = async (email: string, recipeId: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const favorite = await Favorite.findOne({
    userId: user._id,
    recipeId: new Types.ObjectId(recipeId),
  });
  return favorite ? true : false;
};

const removeFromFavorite = async (email: string, recipeId: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const favorite = await Favorite.findOneAndDelete({
    userId: user._id,
    recipeId: new Types.ObjectId(recipeId),
  });
  return favorite;
};

export const favoriteServices = {
  createFavorite,
  getMyFavorite,
  getAlreadyFavorite,
  removeFromFavorite,
};
