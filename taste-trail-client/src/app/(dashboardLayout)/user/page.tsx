import { getRecommendedRecipes } from "@/services/recipeService";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IRecipe } from "@/types";

export default async function UserDashboard() {
  const res = await getRecommendedRecipes();
  const recommendedRecipes = res?.data || [];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Discover new recipes recommended just for you
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mt-4 rounded-full"></div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Recipes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {recommendedRecipes.length}
                </p>
              </div>
              <div className="text-3xl">🍳</div>
            </div>
          </div>
          <Link href="/user/cookbook">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">My Cookbook</p>
                  <p className="text-2xl font-bold text-amber-600">View</p>
                </div>
                <div className="text-3xl">📖</div>
              </div>
            </div>
          </Link>
          <Link href="/user/meal-planner">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Meal Planner</p>
                  <p className="text-2xl font-bold text-purple-600">Plan</p>
                </div>
                <div className="text-3xl">📅</div>
              </div>
            </div>
          </Link>
          <Link href="/user/cooking-history">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">History</p>
                  <p className="text-2xl font-bold text-green-600">View</p>
                </div>
                <div className="text-3xl">🕒</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recommended Recipes Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recommended for You
          </h2>
          
          {!recommendedRecipes || recommendedRecipes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-xl text-gray-500 mb-6">
                No recommendations available at the moment
              </p>
              <Link href="/user/recipes">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Explore All Recipes
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRecipes.map((recipe: IRecipe) => (
                <div
                  key={recipe._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  {/* Recipe Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-200 to-amber-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Recipe Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {recipe.name}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex gap-4 text-sm text-gray-500 mb-4">
                      {recipe.cookingTime && (
                        <span className="flex items-center gap-1">
                          ⏱️ {recipe.cookingTime} min
                        </span>
                      )}
                      {recipe.calories && (
                        <span className="flex items-center gap-1">
                          🔥 {recipe.calories} cal
                        </span>
                      )}
                    </div>

                    {/* Category & Cuisine */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {recipe.categoryId?.name && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                          {recipe.categoryId.name}
                        </span>
                      )}
                      {recipe.cuisineId?.name && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                          {recipe.cuisineId.name}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link href={`/user/recipes/${recipe._id}`}>
                      <Button className="w-full">
                        View Recipe
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
