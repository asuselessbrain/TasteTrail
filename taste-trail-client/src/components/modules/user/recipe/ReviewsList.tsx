"use client"
import { Star } from "lucide-react"
import Image from "next/image"

interface Review {
    id: string
    author: string
    rating: number
    comment: string
    createdAt: string
    avatar?: string
}

interface ReviewsListProps {
    reviews?: Review[]
}

export default function ReviewsList({ reviews = [] }: ReviewsListProps) {
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0

    return (
        <div className="space-y-6">
            {/* Rating Summary */}
            {reviews.length > 0 && (
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                            {averageRating}
                        </div>
                        <div className="flex justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${star <= Math.round(parseFloat(averageRating as string))
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {review.avatar ? (
                                        <Image
                                            width={500}
                                            height={500}
                                            src={review.avatar}
                                            alt={review.author}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                                            {review.author.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.author}</p>
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
