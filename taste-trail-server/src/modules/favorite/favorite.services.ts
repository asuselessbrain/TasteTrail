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

  const { filters, search, sortBy, sortOrder, page, limit } = options;

  const favorites = await queryBuilder(Favorite, {
    filters: { ...filters, userId: user._id },
    search,
    searchFields: [],
    sortBy,
    sortOrder,
    page,
    limit,
    populate: [
      {
        path: "recipeId",
        populate: [
          { path: "categoryId", select: "name" },
          { path: "cuisineId", select: "name" },
        ],
      },
    ],
  });
  return favorites;
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
