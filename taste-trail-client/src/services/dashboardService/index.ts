"use server";
import { baseApi } from "../baseApi";

export const dashboardData = async () => {
  try {
    const res = await baseApi("/dashboard-data", {
      method: "GET",
      next: {
        tags: ["dashboard-data"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
