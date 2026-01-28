import { z } from "zod";

export const cuisineValidationSchema = z.object({
  name: z.string().min(1, "Cuisine name is required"),
  description: z.string().optional(),
});
