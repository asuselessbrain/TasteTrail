"use server"

import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    try {
        const accessToken = ((await cookies()).get("accessToken"))?.value || "";
        if (!accessToken) return null;

        return jwtDecode<IUser>(accessToken);
    } catch {
        return null;
    }
};