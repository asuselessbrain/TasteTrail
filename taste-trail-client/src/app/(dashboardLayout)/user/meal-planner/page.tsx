import { getWeekStart } from "@/components/modules/user/mealPlan/date";
import MealGrid from "@/components/modules/user/mealPlan/MealGrid";
import { getMealPlans } from "@/services/mealPlanService";
import { redirect } from "next/navigation";

export default async function MealPlannerPage({
  searchParams,
}: {
  searchParams: Promise<{ weekStart?: string }>;
}) {
  const params = await searchParams;

  if (!params.weekStart) {
    const currentWeekStart = getWeekStart();
    redirect(`/user/meal-planner?weekStart=${currentWeekStart.toISOString()}`);
  }

  const weekStart = new Date(params.weekStart);

  const res = await getMealPlans({ weekStart: weekStart.toISOString() });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meal Planner</h1>

      {/* CLIENT COMPONENT */}
      <MealGrid mealPlans={res.data} weekStart={weekStart.toISOString()} />
    </div>
  );
}
