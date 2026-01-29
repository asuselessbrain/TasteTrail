"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { updateRecipeMealPlan } from "@/services/mealPlanService";
import { getAllRecipesForMealPlan } from "@/services/recipeService";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddPlanModal from "./AddPlanModal";
import { toast } from "sonner";
import isSameDate from "./CheckIsSameDate";
import { IMealPlan } from "@/types";

export default function DayCard({
  day,
  dayIndex,
  meal,
  weekStart,
}: {
  day: string;
  dayIndex: number;
  meal: IMealPlan | undefined;
  weekStart: string;
}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateObj = new Date(weekStart);
  dateObj.setDate(dateObj.getDate() + dayIndex);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await getAllRecipesForMealPlan();
      setRecipes(res.data);
    };
    fetchRecipes();
  }, []);

  const toastId = "update-meal-plan-status-toast";

  const updateStatus = async (status: string) => {
    setLoading(true);
    const mealDate = new Date(weekStart);
    mealDate.setDate(mealDate.getDate() + dayIndex);

    const today = new Date();

    if (!isSameDate(mealDate, today)) {
      setLoading(false);
      toast.error("You can only update the meal status on the planned date", { id: toastId });
      return;
    }
    setLoading(true);
    const res = await updateRecipeMealPlan(meal?._id || "", { status });
    if (res.success) {
      toast.success(res.message || "Meal plan updated successfully", { id: toastId });
    } else {
      toast.error(res.errorMessage || "Failed to update meal plan", { id: toastId });
    }
    setLoading(false);
  };

  console.log(meal)

  return (
    <Card className="p-4">
      <h3 className="font-semibold">{day}</h3>
      <p className="text-sm text-muted-foreground">{formattedDate}</p>

      {!meal && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2">Add Recipe</Button>
          </DialogTrigger>
          <AddPlanModal
            day={day}
            dateLabel={formattedDate}
            weekStart={weekStart}
            recipes={recipes}
          />
        </Dialog>
      )}

      {meal && (
        <div className="mt-2 space-y-2">
          <p className="font-medium">{meal.recipeId?.name}</p>
          <p className="text-sm">Status: {meal.status}</p>

          {meal.status === "planned" && (
            <Button
              size="sm"
              onClick={() => updateStatus("cooking")}
              disabled={loading}
              className="cursor-pointer disabled:cursor-no-drop"
            >
              {loading ? "Updating..." : "Start Cooking"}
            </Button>
          )}

          {meal.status === "cooking" && (
            <Button
              size="sm"
              onClick={() => updateStatus("cooked")}
              disabled={loading}
              className="cursor-pointer disabled:cursor-no-drop"
            >
              {loading ? "Updating..." : "Mark as Cooked"}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
