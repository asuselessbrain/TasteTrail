import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye } from "lucide-react";
import { IMeta, IRecipe } from "@/types";
import DeleteRecipeAction from "./DeleteRecipeAction";
import UpdateRecipeModal from "./UpdateRecipeModal";
import ViewRecipeModal from "./ViewRecipeModal";
import PaginationComponent from "@/components/shared/PaginationComponent";

export default function RecipeTable({
  recipes,
  meta,
}: {
  recipes: IRecipe[];
  meta: IMeta;
}) {
  return (
    <>
      <div className="rounded-lg border bg-white shadow-sm my-8">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Category
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Cuisine
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Cooking Time
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Calories
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Created At
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recipes && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <TableRow
                  key={recipe._id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <TableCell className="font-medium text-gray-900">
                    {recipe.name}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {recipe.categoryId.name}{" "}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {recipe.cuisineId.name}{" "}
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {recipe.cookingTime} min
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {recipe.calories} kcal
                  </TableCell>

                  <TableCell className="text-gray-700">
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            title="View recipe"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <ViewRecipeModal recipe={recipe} />
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                            title="Edit recipe"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <UpdateRecipeModal recipe={recipe} />
                      </Dialog>

                      <DeleteRecipeAction id={recipe._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No recipes found</p>
                    <p className="text-sm">
                      Create your first recipe to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <PaginationComponent totalPage={meta?.totalPages} />
      </div>
    </>
  );
}
