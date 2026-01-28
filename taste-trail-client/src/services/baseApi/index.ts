"use server"

import { cookies } from "next/headers"

export const baseApi = async (url: string, options: RequestInit = {}) => {
    const accessToken = (await cookies()).get("accessToken")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(accessToken ? { Authorization: `${accessToken}` } : {}),
        },
        credentials: "include",
    })

    const data = await res.json()

    if (!res.ok) {
        throw data
    }

    return data

}