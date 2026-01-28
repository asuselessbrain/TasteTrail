import { z } from "zod";

export const createReviewSchema = z.object({
  recipeId: z.string().min(1, "Recipe ID is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(1, "Comment is required").max(1000, "Comment is too long"),
  status: z.enum(["pending", "approved", "rejected"]).optional().default("pending")
});