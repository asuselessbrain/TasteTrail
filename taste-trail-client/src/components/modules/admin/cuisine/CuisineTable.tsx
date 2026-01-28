import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit } from "lucide-react"
import DeleteCategoryAction from "./DeleteCuisineAction"
import { ICuisine } from "@/types"
import UpdateCuisineModal from "./UpdateCuisineModal"

export default function CuisineTable({ cuisines }: { cuisines: ICuisine[] }) {
    return (
        <div className="rounded-lg border bg-white shadow-sm my-8">
            <Table>
                <TableHeader>
                    <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold text-gray-700">Name</TableHead>
                        <TableHead className="font-semibold text-gray-700">Description</TableHead>
                        <TableHead className="font-semibold text-gray-700">Created At</TableHead>
                        <TableHead className="font-semibold text-gray-700">Updated At</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {cuisines && cuisines.length > 0 ? (
                        cuisines.map((cuisine) => (
                            <TableRow
                                key={cuisine._id}
                                className="border-b transition-colors hover:bg-gray-50"
                            >
                                <TableCell className="font-medium text-gray-900">
                                    {cuisine.name}
                                </TableCell>
                                <TableCell className="text-gray-700">{cuisine.description}</TableCell>
                                <TableCell className="text-gray-700">{cuisine.createdAt}</TableCell>
                                <TableCell className="text-gray-700">{cuisine.updatedAt}</TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                                    title="Edit course"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <UpdateCuisineModal cuisine={cuisine} />
                                        </Dialog>
                                        <DeleteCategoryAction id={cuisine._id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="py-8 text-center">
                                <div className="text-gray-500">
                                    <p className="text-lg font-medium">No courses found</p>
                                    <p className="text-sm">Create your first course to get started</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
