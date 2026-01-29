"use server"
import { baseApi } from "../baseApi";
import { revalidateTag } from "next/cache";

export const generateGroceryList = async () => {
  try {
    const res = await baseApi("/grocery-list", {
      method: "GET",
      next: {
        tags: ["grocery-list"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const markGroceryItemAsPurchased = async (ingredientName: string) => {
  try {
    const res = await baseApi("/grocery-list/purchase", {
      method: "PATCH",
      body: JSON.stringify({ ingredientName }),
      next: {
        tags: ["grocery-list"],
      },
    });
    revalidateTag("grocery-list", "max");
    return res;
  } catch (error) {
    throw error;
  }
};
