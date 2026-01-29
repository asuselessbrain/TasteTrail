"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRecipeMealPlan } from "@/services/mealPlanService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const mealPlannerSchema = z.object({
  recipeId: z.string().min(1, "Recipe is required"),
});

type Props = {
  day: string;
  dateLabel: string;
  weekStart: string;
  recipes: { _id: string; name: string }[];
};

export default function AddPlanModal({
  day,
  dateLabel,
  weekStart,
  recipes,
}: Props) {
  const form = useForm({
    resolver: zodResolver(mealPlannerSchema),
    defaultValues: {
      recipeId: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const toastId = "add-meal-plan-toast";

  const onSubmit = async (data: FieldValues) => {
    const res = await createRecipeMealPlan({
      day,
      recipeId: data.recipeId,
      weekStart,
    });

    if (res.success) {
      form.reset();
      toast.success("Meal added successfully", { id: toastId });
    } else {
      toast.error(res.errorMessage || "Failed to add meal", { id: toastId });
    }
  };

  if(isSubmitting) toast.loading("Adding meal...", { id: toastId });
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Meal</DialogTitle>
        <DialogDescription>
          Plan your meal for <strong>{day}</strong> ({dateLabel})
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-2">
          {/* DAY (READ ONLY) */}
          <Field>
            <FieldLabel>Day</FieldLabel>
            <Input value={day} disabled />
          </Field>

          {/* DATE (READ ONLY) */}
          <Field>
            <FieldLabel>Date</FieldLabel>
            <Input value={dateLabel} disabled />
          </Field>

          {/* RECIPE SELECT */}
          <Controller
            name="recipeId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Select Recipe</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a recipe" />
                  </SelectTrigger>

                  <SelectContent>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe._id} value={recipe._id}>
                        {recipe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldDescription>
                  Select a recipe to plan for this day.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Meal"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
