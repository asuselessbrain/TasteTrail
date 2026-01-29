"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi";
import { revalidateTag } from "next/cache";
import { QueryParams } from "@/types";

export const createRecipe = async (data: FieldValues) => {
  try {
    const res = await baseApi("/recipes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("recipes", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllRecipes = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }
  try {
    const res = await baseApi(`/recipes?${params.toString()}`, {
      method: "GET",
      next: {
        tags: ["recipes"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateRecipe = async (id: string, data: FieldValues) => {
  try {
    const res = await baseApi(`/recipes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    revalidateTag("recipes", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const res = await baseApi(`/recipes/${id}`, {
      method: "DELETE",
    });
    revalidateTag("recipes", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSingleRecipe = async (id: string) => {
  try {
    const res = await baseApi(`/recipes/${id}`, {
      method: "GET",
      next: {
        tags: ["recipes"],
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllRecipesForMealPlan = async () => {
  try {
    const res = await baseApi("/recipes/all-recipes-for-meal-plan", {
      method: "GET",
      next: {
        tags: ["recipes"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getRecommendedRecipes = async () => {
  try {
    const res = await baseApi("/recipes/recommended", {
      method: "GET",
      next: {
        tags: ["recipes"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
