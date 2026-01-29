"use server";

import { cookies } from "next/headers";

export const baseApi = async (url: string, options: RequestInit = {}) => {
    const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `${accessToken}` } : {}),
    },
    credentials: "include",
  });

  const data = await res.json();

  return data;
};
