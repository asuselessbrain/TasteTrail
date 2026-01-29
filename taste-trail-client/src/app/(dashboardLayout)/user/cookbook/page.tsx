import RecipeCard from "@/components/modules/user/recipe/RecipeCard";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSorting from "@/components/shared/ReusableSorting";
import Searching from "@/components/shared/Searching";
import { getMyFavorites } from "@/services/favoriteService";
import { SortOption } from "@/types";

export default async function MyCookBook({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const limit = 12;

  const queryParams = {
    search: params.search,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    page,
    limit,
  };
  const myCookBook = await getMyFavorites(queryParams);
  const myCookBookList = myCookBook?.data || [];

  const favoriteSortOptions: SortOption[] = [
    { label: "Recently Added", value: "createdAt-desc" },
    { label: "Oldest Added", value: "createdAt-asc" },
    { label: "Recipe Name (A → Z)", value: "recipeId.name-asc" },
    { label: "Recipe Name (Z → A)", value: "recipeId.name-desc" },
    { label: "Fastest Cooking", value: "recipeId.cookingTime-asc" },
    { label: "Slowest Cooking", value: "recipeId.cookingTime-desc" },
    { label: "Calories (Low to High)", value: "recipeId.calories-asc" },
    { label: "Calories (High to Low)", value: "recipeId.calories-desc" },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipes</h1>
        <p className="text-gray-600">
          Discover delicious recipes from around the world
        </p>
      </div>

      {myCookBookList.length > 0 ? (
        /* Grid Layout */
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
            <Searching placeholder="Search recipe name category or cuisine..." />
            <ReusableSorting
              options={favoriteSortOptions}
              defaultValue={
                params.sortBy && params.sortOrder
                  ? `${params.sortBy}-${params.sortOrder}`
                  : undefined
              }
              className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myCookBookList.map((cookBook) => (
              <RecipeCard key={cookBook._id} recipe={cookBook.recipeId} />
            ))}
          </div>
          <div className="mt-10">
            <PaginationComponent totalPage={myCookBook?.meta?.totalPages} />
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 mb-2">
              No recipes found
            </p>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        </div>
      )}
    </div>
  );
}
