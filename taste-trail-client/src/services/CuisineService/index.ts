"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi";
import { revalidateTag } from "next/cache";
import { QueryParams } from "@/types";

export const createCuisine = async (data: FieldValues) => {
  try {
    const res = await baseApi("/cuisines", {
      method: "POST",
      body: JSON.stringify(data),
    });
    revalidateTag("cuisines", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllCuisines = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }
  try {
    const res = await baseApi(`/cuisines?${params.toString()}`, {
      method: "GET",
      next: {
        tags: ["cuisines"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCuisine = async (id: string, data: FieldValues) => {
  try {
    const res = await baseApi(`/cuisines/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    revalidateTag("cuisines", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteCuisine = async (id: string) => {
  try {
    const res = await baseApi(`/cuisines/${id}`, {
      method: "DELETE",
    });
    revalidateTag("cuisines", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllCuisinesForFiltering = async () => {
  try {
    const res = await baseApi("/cuisines/for-filtering", {
      method: "GET",
      next: {
        tags: ["cuisines"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
