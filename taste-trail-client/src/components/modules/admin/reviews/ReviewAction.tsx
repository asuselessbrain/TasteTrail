import { Button } from "@/components/ui/button";
import { approveReview } from "@/services/review";
import Link from "next/link";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReviewAction({ review }: { review: any }) {

    const handleApproveReview = async () => {
        const res = await approveReview(review._id);

        if (res.success) {
            toast.success(res.message || "Review approved successfully!");
        } else {
            toast.error(res.errorMessage || "Failed to approve review.");
        }
    }
    return (
        <div className="flex justify-end gap-2">
            <Link href={`/reviews/${review._id}`}>
                <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                    View Details
                </Button>
            </Link>
            {review.status !== "approved" && (
                <Button
                onClick={handleApproveReview}
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                >
                    Approve
                </Button>
            )}
            {review.status !== "rejected" && (
                <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    Reject
                </Button>
            )}
        </div>
    )
}
