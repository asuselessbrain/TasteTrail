import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { responser } from "../../utils/responser";
import { favoriteServices } from "./favorite.services";

const createFavorite = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const favorite = req.body;

  const result = await favoriteServices.createFavorite(
    user?.email as string,
    favorite,
  );
  responser(res, {
    statusCode: 201,
    message: "Add to favorite successful",
    data: result,
  });
});

const getMyFavorites = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const options = req.query;
  const result = await favoriteServices.getMyFavorite(
    user?.email as string,
    options,
  );
  responser(res, {
    statusCode: 200,
    message: "Favorites retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAlreadyFavorite = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { recipeId } = req.params;
  const result = await favoriteServices.getAlreadyFavorite(
    user?.email as string,
    recipeId as string,
  );
  responser(res, {
    statusCode: 200,
    message: "Favorite status retrieved successfully",
    data: result,
  });
});

const removeFromFavorite = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { recipeId } = req.params;
  const result = await favoriteServices.removeFromFavorite(
    user?.email as string,
    recipeId as string,
  );
  responser(res, {
    statusCode: 200,
    message: "Removed from favorite successfully",
    data: result,
  });
});

export const favoriteController = {
  createFavorite,
  getMyFavorites,
  getAlreadyFavorite,
  removeFromFavorite,
};