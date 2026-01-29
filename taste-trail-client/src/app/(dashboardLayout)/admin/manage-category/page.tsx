import CategoryTable from "@/components/modules/admin/category/CategoryTable";
import CreateCategoryModal from "@/components/modules/admin/category/CreateCategoryModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getAllCategories } from "@/services/categoryService";
import { Plus } from "lucide-react";

export default async function ManageCategoryPage({
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
  const limit = 10;

  const queryParams = {
    search: params.search,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    page,
    limit
  }
  const categories = await getAllCategories(queryParams);

  return (
    <div className="max-w-360 w-full mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Course Management
          </h1>
          <p className="mt-1 text-gray-600">
            Manage and organize all courses in your system
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4 text-white" />
              Create Course
            </Button>
          </DialogTrigger>
          <CreateCategoryModal />
        </Dialog>
      </div>

      <CategoryTable categories={categories.data} meta={categories.meta} />
    </div>
  );
}
