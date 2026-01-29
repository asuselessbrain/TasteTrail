import { getSingleRecipe } from "@/services/recipeService";
import Image from "next/image";
import {
  Clock,
  Flame,
  ChefHat,
  ArrowLeft,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReviewForm from "@/components/modules/user/recipe/ReviewForm";
import ReviewsList from "@/components/modules/user/recipe/ReviewsList";
import { totalAndAverageReviewsByRecipeId } from "@/services/review";
import FavoriteAction from "@/components/modules/user/favorite/FavoriteAction";
import { getAlreadyFavorite } from "@/services/favoriteService";

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const singleRecipe = await getSingleRecipe(id);

  const totalAndAverage = await totalAndAverageReviewsByRecipeId(id);

  const alreadyInFavorites = await getAlreadyFavorite(id);

  if (!singleRecipe.success || !singleRecipe.data) {
    return (
      <div className="max-w-360 w-full mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Recipe not found
          </h1>
          <Link href="/user/recipes">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const recipe = singleRecipe.data;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-360 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              {recipe.image ? (
                <div className="relative h-96 md:h-125 w-full">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="h-96 md:h-125 flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
                  <ChefHat className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex gap-4 border-b border-gray-200 mb-6">
              <button className="pb-4 font-semibold text-gray-900 border-b-2 border-orange-600">
                Description
              </button>
              <button className="pb-4 text-gray-600 hover:text-gray-900">
                Nutrition
              </button>
            </div>

            <div className="space-y-6 mb-12">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Ingredients
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recipe.ingredients && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary shrink-0"></span>
                          {ingredient}
                        </li>
                      ),
                    )
                  ) : (
                    <p className="text-gray-500">No ingredients listed</p>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Cooking Instructions
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {recipe.instructions || "No instructions available"}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Customer Reviews
              </h3>
              <ReviewsList id={recipe._id} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {recipe.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <=
                            Math.round(
                              parseFloat(
                                totalAndAverage.data.averageRating as string,
                              ),
                            )
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({totalAndAverage.data.totalReviews} review
                      {totalAndAverage.data.totalReviews !== 1 ? "s" : ""})
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Category
                    </p>
                    <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                      <p className="text-sm font-semibold text-blue-700">
                        {recipe.categoryId?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Cuisine Type
                    </p>
                    <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                      <p className="text-sm font-semibold text-green-700">
                        {recipe.cuisineId?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="text-sm text-gray-700">
                        Cooking Time
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {recipe.cookingTime} min
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-red-600" />
                      <span className="text-sm text-gray-700">Calories</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {recipe.calories} kcal
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <FavoriteAction recipeId={recipe._id} isAddedInFavorite={alreadyInFavorites.data} />
                </div>

                <div className="border-t border-gray-200 pt-4 text-xs text-gray-600 space-y-1">
                  <p>
                    Created: {new Date(recipe.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    Last Updated:{" "}
                    {new Date(recipe.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <ReviewForm recipeId={recipe._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
