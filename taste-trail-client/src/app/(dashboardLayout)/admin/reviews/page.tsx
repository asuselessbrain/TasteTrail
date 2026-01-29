import { getAllReviews } from "@/services/review";
import ReviewsTable from "@/components/modules/admin/reviews/ReviewsTable";

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

export default async function ReviewsPage() {

  
  const reviews = await getAllReviews();

  const reviewList = reviews.data;

  return (
    <div className="space-y-8 max-w-360 w-full mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reviews Management
        </h1>
        <p className="text-gray-600">
          Approve, reject, or manage user reviews for recipes
        </p>
      </div>

      <ReviewsTable reviews={reviewList} meta={reviews.meta} />
    </div>
  );
}
