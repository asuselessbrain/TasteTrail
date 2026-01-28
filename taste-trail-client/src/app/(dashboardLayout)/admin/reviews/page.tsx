import { getAllReviews } from "@/services/review"

export default async function ReviewsPage() {
    const reviews = await getAllReviews()
    const reviewList = reviews.data

    return (
        <div>ReviewsPage</div>
    )
}
