import { baseApi } from "../baseApi";

export const getMyCookingHistory = async () => {
  try {
    const res = await baseApi("/cooked-history", {
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