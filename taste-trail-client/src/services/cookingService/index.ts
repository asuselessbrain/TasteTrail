import { QueryParams } from "@/types";
import { baseApi } from "../baseApi";

export const getMyCookingHistory = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  try {
    const res = await baseApi(`/cooked-history?${params.toString()}`, {
      method: "GET",
      next: {
        tags: ["cooked-history"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
