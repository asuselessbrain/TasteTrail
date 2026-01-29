import { queryBuilder } from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { CookingHistory } from "../cookedHistory/cookedHIstory.model";
import { Favorite } from "../favorite/favorite.medel";
import { Review } from "../review/review.medel";
import { Recipe } from "./recipe.medel";
import { IRecipe } from "./recipe.type";

const createRecipe = async (data: IRecipe) => {
  const recipe = new Recipe(data);

  return await recipe.save();
};

const getAllRecipes = async (options: Record<string, any>) => {
  return await queryBuilder(Recipe, {
    filters: options.filters,
    search: options.search,
    searchFields: ["name", "description"],
    sortBy: options.sortBy,
    sortOrder: options.sortOrder,
    page: options.page,
    limit: options.limit,
    populate: ["categoryId", "cuisineId"],
    searchInPopulate: [
      { path: "categoryId", field: "name" },
      { path: "cuisineId", field: "name" },
    ],
    populateCollectionNames: {
      categoryId: "categories",
      cuisineId: "cuisines",
    },
  });
};
const updateRecipe = async (id: string, data: Partial<IRecipe>) => {
  const updateRecipe = await Recipe.findByIdAndUpdate(id, data, { new: true });
  return updateRecipe;
};

const deleteRecipe = async (id: string) => {
  const deleteRecipe = await Recipe.findByIdAndDelete(id);
  return deleteRecipe;
};

const getSingleRecipe = async (id: string) => {
  const recipe = await Recipe.findById(id).populate([
    "categoryId",
    "cuisineId",
  ]);
  return recipe;
};

const getAllRecipesForMealPlan = async () => {
  const recipes = await Recipe.find().populate(["categoryId", "cuisineId"]);
  return recipes;
};

const recommendedRecipes = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, "User not found");

  const history = await CookingHistory.find({ userId: user._id }).populate({
    path: "recipeId",
    populate: [
      { path: "categoryId", select: "name" },
      { path: "cuisineId", select: "name" },
    ],
  });

  const categoryCount: Record<string, number> = {};
  const cuisineCount: Record<string, number> = {};

  for (const item of history) {
    if (!item.recipeId) continue;
    const recipe = item.recipeId as unknown as {
      categoryId?: { _id: string };
      cuisineId?: { _id: string };
    };

    const catId = recipe.categoryId?._id.toString();
    const cuiId = recipe.cuisineId?._id.toString();

    if (catId) categoryCount[catId] = (categoryCount[catId] || 0) + 1;
    if (cuiId) cuisineCount[cuiId] = (cuisineCount[cuiId] || 0) + 1;
  }
  const mostCookedCategoryId =
    Object.keys(categoryCount).length > 0
      ? Object.keys(categoryCount).reduce((a, b) =>
          (categoryCount[a] ?? 0) > (categoryCount[b] ?? 0) ? a : b,
        )
      : null;

  const mostCookedCuisineId =
    Object.keys(cuisineCount).length > 0
      ? Object.keys(cuisineCount).reduce((a, b) =>
          (cuisineCount[a] ?? 0) > (cuisineCount[b] ?? 0) ? a : b,
        )
      : null;

  const allRecipes = await Recipe.find()
    .populate("categoryId")
    .populate("cuisineId");

  const favorites = await Favorite.find({ userId: user._id });
  const favoriteRecipeIds = favorites.map((f) => f.recipeId.toString());
  const favoriteRecipes = allRecipes.filter((r) =>
    favoriteRecipeIds.includes(r._id.toString()),
  );

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentCookedIds = history
    .filter((h) => new Date(h.cookedDate) >= sevenDaysAgo)
    .map((h) => h.recipeId._id.toString());

  const popularRecipesData = await Review.aggregate([
    { $group: { _id: "$recipeId", reviewCount: { $sum: 1 } } },
    { $sort: { reviewCount: -1 } },
    { $limit: 10 },
  ]);
  const popularRecipeIds = popularRecipesData.map((p) => p._id.toString());
  const popularRecipes = allRecipes.filter(
    (r) =>
      popularRecipeIds.includes(r._id.toString()) &&
      !favoriteRecipeIds.includes(r._id.toString()),
  );

  const remainingRecipes = allRecipes.filter(
    (r) =>
      !favoriteRecipeIds.includes(r._id.toString()) &&
      !popularRecipeIds.includes(r._id.toString()) &&
      !recentCookedIds.includes(r._id.toString()),
  );

  const prioritizedRecipes = [
    ...remainingRecipes.filter(
      (r) =>
        r.categoryId?._id.toString() === mostCookedCategoryId ||
        r.cuisineId?._id.toString() === mostCookedCuisineId,
    ),
    ...remainingRecipes.filter(
      (r) =>
        r.categoryId?._id.toString() !== mostCookedCategoryId &&
        r.cuisineId?._id.toString() !== mostCookedCuisineId,
    ),
  ];

  let finalRecommendations = [
    ...favoriteRecipes,
    ...popularRecipes,
    ...prioritizedRecipes,
  ];

  if (finalRecommendations.length < 12) {
    const trendingRecipesData = await Review.aggregate([
      { $group: { _id: "$recipeId", reviewCount: { $sum: 1 } } },
      { $sort: { reviewCount: -1 } },
      { $limit: 12 },
    ]);
    const trendingRecipeIds = trendingRecipesData.map((r) => r._id.toString());
    const trendingRecipes = allRecipes.filter(
      (r) =>
        trendingRecipeIds.includes(r._id.toString()) &&
        !finalRecommendations.find((fr) => fr._id.equals(r._id)),
    );

    const remaining = allRecipes.filter(
      (r) => !finalRecommendations.find((fr) => fr._id.equals(r._id)),
    );
    const randomRecipes = remaining.sort(() => 0.5 - Math.random());

    finalRecommendations.push(...trendingRecipes, ...randomRecipes);
  }

  finalRecommendations = finalRecommendations.slice(0, 12);

  return finalRecommendations;
};

export const recipeServices = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getSingleRecipe,
  getAllRecipesForMealPlan,
  recommendedRecipes,
};
