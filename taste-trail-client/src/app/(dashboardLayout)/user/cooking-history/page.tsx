import { getMyCookingHistory } from "@/services/cookingService";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/shared/PaginationComponent";
import Searching from "@/components/shared/Searching";
import { ICookingHistory, SortOption } from "@/types";
import ReusableSorting from "@/components/shared/ReusableSorting";

export default async function CookingHistoryPage() {
  const cookingHistory = await getMyCookingHistory();
  const historyList = cookingHistory?.data || [];

  const historySortOptions: SortOption[] = [
    { label: "Most Recent", value: "cookedDate-desc" },
    { label: "Oldest History", value: "cookedDate-asc" },
    { label: "Recipe Name (A → Z)", value: "recipeId.name-asc" },
    { label: "Recipe Name (Z → A)", value: "recipeId.name-desc" },
    { label: "Fastest Recipes", value: "recipeId.cookingTime-asc" },
    { label: "Slowest Recipes", value: "recipeId.cookingTime-desc" },
    { label: "Calories (Low to High)", value: "recipeId.calories-asc" },
    { label: "Calories (High to Low)", value: "recipeId.calories-desc" },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-360 mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cooking History
          </h1>
          <p className="text-lg text-gray-600">
            Your culinary journey and achievements
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-amber-500 mt-4 rounded-full"></div>
        </div>

        {historyList && historyList.length > 0 && (
          <div className="my-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Your Cooking Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">
                  {historyList.length}
                </p>
                <p className="text-sm text-gray-600">Recipes Cooked</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-3xl font-bold text-amber-600">
                  {(() => {
                    const totalMinutes = historyList.reduce(
                      (sum: number, h: ICookingHistory) =>
                        sum + (h.recipeId?.cookingTime || 0),
                      0,
                    );
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    return hours > 0
                      ? `${hours}hr ${minutes}min`
                      : `${minutes}min`;
                  })()}
                </p>
                <p className="text-sm text-gray-600">Time in Kitchen</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">
                  {
                    new Set(
                      historyList
                        .map((h: ICookingHistory) => h.recipeId?.cuisineId?.name)
                        .filter(Boolean),
                    ).size
                  }
                </p>
                <p className="text-sm text-gray-600">Cuisines Explored</p>
              </div>
            </div>
          </div>
        )}

        {!historyList || historyList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-xl text-gray-500 mb-6">
                No cooking history yet
              </p>
              <Link href="/user/meal-planner">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Start Planning Meals
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Timeline */
          <div className="space-y-6">
            {historyList.map((history: ICookingHistory) => {
              const cookedDate = new Date(history.cookedDate);
              const formattedDate = cookedDate.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
              const formattedTime = cookedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={history._id}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
                    <Searching placeholder="Search recipe name category or cuisine..." />
                    <ReusableSorting
                      options={historySortOptions}
                      className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition cursor-pointer"
                    />
                  </div>
                  <div
                    key={history._id}
                    className="relative pl-8 pb-8 border-l-2 border-orange-300 last:border-l-0"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-orange-50"></div>

                    {/* Card */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="md:flex">
                        {/* Recipe Image */}
                        <div className="md:w-1/3 relative h-48 md:h-auto bg-gray-200">
                          {history.recipeId?.image ? (
                            <Image
                              src={history.recipeId.image}
                              alt={history.recipeId.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-200 to-amber-200">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>

                        {/* Recipe Details */}
                        <div className="md:w-2/3 p-6">
                          {/* Date & Day */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                              {history.day}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formattedDate} at {formattedTime}
                            </span>
                          </div>

                          {/* Recipe Name */}
                          <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            {history.recipeId?.name}
                          </h2>

                          {/* Meta Info */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            {history.recipeId?.cookingTime && (
                              <span className="flex items-center gap-1">
                                ⏱️ {history.recipeId.cookingTime} min
                              </span>
                            )}
                            {history.recipeId?.calories && (
                              <span className="flex items-center gap-1">
                                🔥 {history.recipeId.calories} cal
                              </span>
                            )}
                          </div>

                          {/* Category & Cuisine */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {history.recipeId?.categoryId?.name && (
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                {history.recipeId.categoryId.name}
                              </span>
                            )}
                            {history.recipeId?.cuisineId?.name && (
                              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                {history.recipeId.cuisineId.name}
                              </span>
                            )}
                          </div>

                          {/* Action Button */}
                          <Link href={`/user/recipes/${history.recipeId?._id}`}>
                            <Button>View Recipe Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <PaginationComponent
                      totalPage={cookingHistory?.meta?.totalPages}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
