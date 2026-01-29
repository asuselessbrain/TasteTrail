"use server";
import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi";
import { cookies } from "next/headers";

export const signUp = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (data: FieldValues) => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (result.success) {
      cookieStore.set("accessToken", result.data.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();
    cookieStore.delete("accessToken");
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserDetails = async () => {
  try {
    const res = await baseApi(`/auth/user`, {
      method: "GET",
      credentials: "include",
      next: {
        tags: ["current-user"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
