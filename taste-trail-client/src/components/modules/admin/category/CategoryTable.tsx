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
import { ICategory, IMeta } from "@/types";
import { Edit, Eye, Trash2 } from "lucide-react";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryAction from "./DeleteCategoryAction";
import PaginationComponent from "@/components/shared/PaginationComponent";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function CategoryTable({
  categories,
  meta,
}: {
  categories: ICategory[];
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
                Description
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Created At
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Updated At
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <TableRow
                  key={category._id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <TableCell className="font-medium text-gray-900">
                    {category.name}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(category.updatedAt).toLocaleDateString()}
                  </TableCell>

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
                        <UpdateCategoryModal category={category} />
                      </Dialog>
                      <DeleteCategoryAction id={category._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No courses found</p>
                    <p className="text-sm">
                      Create your first course to get started
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
