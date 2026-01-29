"use server";

import { revalidateTag } from "next/cache";
import { baseApi } from "../baseApi";

export const getMealPlans = async (query: { weekStart: string }) => {
  try {
    const res = await baseApi(`/meal-planner?weekStart=${query.weekStart}`, {
      method: "GET",
      next: {
        tags: ["meal-plans"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const createRecipeMealPlan = async (data: {
  day: string;
  recipeId: string;
  weekStart: string;
}) => {
  try {
    const res = await baseApi("/meal-planner", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("meal-plans", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateRecipeMealPlan = async (
  id: string,
  data: { status: string },
) => {
  try {
    const res = await baseApi(`/meal-planner/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    revalidateTag("meal-plans", "max");
    return res;
  } catch (error) {
    throw error;
  }
};
