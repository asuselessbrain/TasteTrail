import { getApprovedReviewsByRecipe, totalAndAverageReviewsByRecipeId } from "@/services/review"
import { IReview } from "@/types"
import { Star } from "lucide-react"
import Image from "next/image"


export default async function ReviewsList({ id }: { id: string }) {

    const reviews = await getApprovedReviewsByRecipe(id)
    const totalAndAverage = await totalAndAverageReviewsByRecipeId(id)
    const reviewList = reviews.data
    return (
        <div className="space-y-6">
            {/* Rating Summary */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                        {totalAndAverage.data.averageRating || "0.0"}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-5 w-5 ${star <= Math.round(parseFloat(totalAndAverage.data.averageRating as string))
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">
                        Based on {totalAndAverage.data.totalReviews} review{totalAndAverage.data.totalReviews !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviewList.length > 0 ? (
                    reviewList.map((review: IReview) => (
                        <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {review.userId.profilePhoto ? (
                                        <Image
                                            width={500}
                                            height={500}
                                            src={review.userId.profilePhoto}
                                            alt={review.userId.fullName}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                                            {review.userId.fullName}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.userId.fullName}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
