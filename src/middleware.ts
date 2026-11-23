import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthenticated = !!token;
    const role = token?.role;
    const pathname = req.nextUrl.pathname;

    // --- Admin routes: only ADMIN role ---
    if (pathname.startsWith("/admin")) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, req.url));
      }
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // --- Customer routes: require authentication ---
    if (pathname.startsWith("/customer")) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, req.url));
      }
    }

    // --- Redirect authenticated users away from login/register ---
    if ((pathname === "/login" || pathname === "/register") && isAuthenticated) {
      const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/";
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow public routes without token
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
    "/login",
    "/register",
    "/checkout/:path*",
    "/cart/:path*",
    "/orders/:path*",
  ],
};
