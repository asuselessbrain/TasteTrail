"use server";

import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    
  const cookieStore = await cookies();

  try {
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    return jwtDecode<IUser>(accessToken);
  } catch {
    return null;
  }
};
