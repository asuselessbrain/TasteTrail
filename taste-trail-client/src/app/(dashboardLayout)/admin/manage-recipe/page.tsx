import CreateRecipeModal from "@/components/modules/admin/recipe/CreateRecipeModal";
import RecipeTable from "@/components/modules/admin/recipe/RecipeTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getAllRecipes } from "@/services/recipeService";
import { Plus } from "lucide-react";

export default async function ManageRecipePage() {
    const recipes = await getAllRecipes()

    return (
        <div className="max-w-360 w-full mx-auto">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Recipe Management
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Manage and organize all recipes in your system
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2 cursor-pointer">
                            <Plus className="h-4 w-4 text-white" />
                            Create Recipe
                        </Button>
                    </DialogTrigger>
                    <CreateRecipeModal />
                </Dialog>
            </div>

            <RecipeTable recipes={recipes.data} />
        </div>
    )
}
