import { User } from "../auth/auth.model";
import { Category } from "../category/category.medel";
import { Cuisine } from "../cuisine/cuisine.medel";
import { Recipe } from "../recipe/recipe.medel";
import { Review } from "../review/review.medel";

const getAdminDashboardData = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const userGrowthQuery = User.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { date: "$_id", users: "$count", _id: 0 } },
  ]);

  const recipeDistributionQuery = Recipe.aggregate([
    {
      $lookup: {
        from: "categories", 
        localField: "categoryId",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $group: {
        _id: "$categoryDetails.name",
        count: { $sum: 1 },
      },
    },
    { $project: { name: "$_id", value: "$count", _id: 0 } },
  ]);

  const [
    totalUsers,
    totalRecipes,
    pendingReview,
    totalCategory,
    totalCuisines,
    userGrowth,
    recipeDistribution,
  ] = await Promise.all([
    User.countDocuments(),
    Recipe.countDocuments(),
    Review.countDocuments({ status: "pending" }),
    Category.countDocuments(),
    Cuisine.countDocuments(),
    userGrowthQuery, 
    recipeDistributionQuery,
  ]);

  return {
    stats: {
      totalUsers,
      totalRecipes,
      pendingReview,
      totalCategory,
      totalCuisines,
    },
    charts: {
      userGrowth,
      recipeDistribution,
    },
  };
};

export const DashboardDataService = {
  getAdminDashboardData,
};