import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService/auth-server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;

    const user = await getCurrentUser();

    if (user) {
        isAuthenticated = true;
        isAdmin = user.role === "admin";
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAdmin && pathname.startsWith("/user")) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (!isAdmin && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/user", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user",
        "/user/:path*",
        "/admin",
        "/admin/:path*",
    ],
};