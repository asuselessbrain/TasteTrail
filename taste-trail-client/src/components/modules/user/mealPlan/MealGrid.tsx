"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DayCard from "./DayCard";
import { IMealPlan } from "@/types";

const DAYS = [
  "Monday","Tuesday","Wednesday",
  "Thursday","Friday","Saturday","Sunday"
];

export default function MealGrid({
  mealPlans,
  weekStart,
}: {
  mealPlans: IMealPlan[];
  weekStart: string;
}) {
  const router = useRouter();

  const getMealForDay = (day: string) =>
    mealPlans.find((m) => m.day === day);

  const changeWeek = (offset: number) => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + offset * 7);

    router.push(
      `/user/meal-planner?weekStart=${next.toISOString()}`
    );
  };

  return (
    <>
      {/* WEEK NAV */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => changeWeek(-1)}>
          Previous
        </Button>
        <Button variant="outline" onClick={() => changeWeek(1)}>
          Next
        </Button>
      </div>

      {/* DAYS */}
      <div className="grid gap-4 md:grid-cols-2">
        {DAYS.map((day, index) => (
          <DayCard
            key={day}
            day={day}
            dayIndex={index}
            meal={getMealForDay(day)}
            weekStart={weekStart}
          />
        ))}
      </div>
    </>
  );
}
