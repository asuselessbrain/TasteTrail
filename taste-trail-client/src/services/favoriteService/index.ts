"use server";
import { revalidateTag } from "next/cache";
import { baseApi } from "../baseApi";
import { QueryParams } from "@/types";

export const createFavorite = async (recipeId: string) => {
  try {
    const res = await baseApi("/favorites", {
      method: "POST",
      body: JSON.stringify({ recipeId }),
    });
    revalidateTag("favorite", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMyFavorites = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  try {
    const res = await baseApi(`/favorites?${params.toString()}`, {
      method: "GET",
      next: {
        tags: ["favorite"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAlreadyFavorite = async (recipeId: string) => {
  try {
    const res = await baseApi(`/favorites/${recipeId}`, {
      method: "GET",
      next: {
        tags: ["favorite"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const removeFromFavorite = async (recipeId: string) => {
  try {
    const res = await baseApi(`/favorites/${recipeId}`, {
      method: "DELETE",
    });
    revalidateTag("favorite", "max");
    return res;
  } catch (error) {
    throw error;
  }
};
