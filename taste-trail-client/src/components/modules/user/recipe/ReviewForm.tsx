"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react"; // make sure you have lucide-react installed
import { toast } from "sonner";

interface ReviewFormData {
  rating: number;
  comment: string;
}

export default function ReviewForm() {
  const [hoverRating, setHoverRating] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ReviewFormData) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Rating */}
      <Controller
        name="rating"
        control={control}
        rules={{
          required: "Rating is required",
          min: { value: 1, message: "Please select at least 1 star" },
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => field.onChange(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || field.value)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {field.value > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {["Poor", "Fair", "Good", "Very Good", "Excellent"][
                  field.value - 1
                ]}
              </p>
            )}
            {errors.rating && (
              <p className="text-xs text-red-500 mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Comment */}
      <Controller
        name="comment"
        control={control}
        rules={{
          required: "Comment is required",
          minLength: {
            value: 10,
            message: "Comment must be at least 10 characters",
          },
        }}
        render={({ field }) => (
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Your Review
            </label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this recipe..."
              {...field}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              {field.value.length} characters
            </p>
            {errors.comment && (
              <p className="text-xs text-red-500 mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-semibold"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
