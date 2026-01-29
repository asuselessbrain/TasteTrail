import { getAllRecipes } from "@/services/recipeService";
import RecipeCard from "@/components/modules/user/recipe/RecipeCard";
import { IRecipe, SortOption } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import Searching from "@/components/shared/Searching";
import ReusableSorting from "@/components/shared/ReusableSorting";

export default async function RecipesPage({
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
  const recipes = await getAllRecipes(queryParams);

  const recipeList = recipes.data;

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "name-asc" },
    { label: "Name (Z → A)", value: "name-desc" },
    { label: "Cooking Time (Low to High)", value: "cookingTime-asc" },
    { label: "Cooking Time (High to Low)", value: "cookingTime-desc" },
    { label: "Calories (Low to High)", value: "calories-asc" },
    { label: "Calories (High to Low)", value: "calories-desc" },
    { label: "Newest first", value: "createdAt-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipes</h1>
        <p className="text-gray-600">
          Discover delicious recipes from around the world
        </p>
      </div>

      {recipeList.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
            <Searching placeholder="Search recipe name category or cuisine..." />
            <ReusableSorting
              options={sortOptions}
              defaultValue={
                params.sortBy && params.sortOrder
                  ? `${params.sortBy}-${params.sortOrder}`
                  : undefined
              }
              className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipeList.map((recipe: IRecipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
          <div className="mt-12">
            <PaginationComponent totalPage={recipes?.meta?.totalPages} />
          </div>
        </>
      ) : (
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
