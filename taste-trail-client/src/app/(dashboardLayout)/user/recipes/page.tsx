import { getAllRecipes } from "@/services/recipeService";
import RecipeCard from "@/components/modules/user/recipe/RecipeCard";
import { IRecipe } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";

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

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipes</h1>
        <p className="text-gray-600">
          Discover delicious recipes from around the world
        </p>
      </div>

      {recipeList.length > 0 ? (
        /* Grid Layout */
        <>
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
