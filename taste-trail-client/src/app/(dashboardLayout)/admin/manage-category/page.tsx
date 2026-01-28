import CategoryTable from "@/components/modules/admin/category/CategoryTable";
import CreateCategoryModal from "@/components/modules/admin/category/CreateCategoryModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getAllCategories } from "@/services/categoryService";
import { Plus } from "lucide-react";

export default async function ManageCategoryPage() {
    const categories = await getAllCategories()

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

            <CategoryTable categories={categories.data} />
        </div>
    )
}
