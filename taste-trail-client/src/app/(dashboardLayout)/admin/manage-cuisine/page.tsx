import CreateCuisineModal from "@/components/modules/admin/cuisine/CreateCuisineModal";
import CuisineTable from "@/components/modules/admin/cuisine/CuisineTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getAllCuisines } from "@/services/CuisineService";
import { Plus } from "lucide-react";

export default async function ManageCuisinePage() {
    const cuisines = await getAllCuisines()

    return (
        <div className="max-w-360 w-full mx-auto">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Cuisine Management
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Manage and organize all cuisines in your system
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2 cursor-pointer">
                            <Plus className="h-4 w-4 text-white" />
                            Create Cuisine
                        </Button>
                    </DialogTrigger>
                    <CreateCuisineModal />
                </Dialog>
            </div>

            <CuisineTable cuisines={cuisines.data} />
        </div>
    )
}
