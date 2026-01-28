import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .nonempty("At least one ingredient is required"),
  instructions: z.string().min(1, "Instructions are required"),
  categoryId: z.string().min(1, "Category is required"),
  cuisineId: z.string().min(1, "Cuisine is required"),
  cookingTime: z
    .number()
    .int()
    .positive("Cooking time must be a positive number"),
  calories: z
    .number()
    .int()
    .positive("Calories must be a positive number"),
  image: z.string().url().optional(),
});