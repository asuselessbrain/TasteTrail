"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Star } from "lucide-react";
import ReviewAction from "./ReviewAction";
import { IMeta } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";

interface Review {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  recipeId: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface ReviewsTableProps {
  reviews: Review[];
  meta: IMeta;
}

export default function ReviewsTable({ reviews, meta }: ReviewsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <CheckCircle className="h-4 w-4" />
            Approved
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
            <XCircle className="h-4 w-4" />
            Rejected
          </div>
        );
      case "pending":
      default:
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            <Clock className="h-4 w-4" />
            Pending
          </div>
        );
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                User
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Recipe
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Rating
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Comment
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow
                  key={review._id}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <TableCell>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.userId?.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {review.userId?.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium text-gray-900">
                    {review.recipeId?.name || "Deleted Recipe"}
                  </TableCell>

                  <TableCell>{getRatingStars(review.rating)}</TableCell>

                  <TableCell className="max-w-xs">
                    <p
                      className="text-gray-700 text-sm line-clamp-2"
                      title={review.comment}
                    >
                      {review.comment}
                    </p>
                  </TableCell>

                  <TableCell>{getStatusBadge(review.status)}</TableCell>

                  <TableCell className="text-right">
                    <ReviewAction review={review} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No reviews found</p>
                    <p className="text-sm">
                      Reviews will appear here when users submit them
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
