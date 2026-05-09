import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const userToken =
    req.cookies.get("token")?.value;

  const adminToken =
    req.cookies.get("admin_token")?.value;

  /*
   USER PROTECTION
  */
  const protectedUserRoutes = [
    "/main",
    "/profile",
    "/challenges",
    "/leaderboard",
  ];

  const isUserProtected =
    protectedUserRoutes.some((route) =>
      path.startsWith(route)
    );

  if (isUserProtected) {
    if (!userToken) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    try {
      jwt.verify(
        userToken,
        process.env.JWT_SECRET!
      );
    } catch {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }
  }

  /*
   ADMIN PROTECTION
  */
  if (path === "/admin/login") {
    if (adminToken) {
      try {
        jwt.verify(
          adminToken,
          process.env.ADMIN_JWT_SECRET!
        );

        return NextResponse.redirect(
          new URL(
            "/admin/dashboard",
            req.url
          )
        );
      } catch {}
    }

    return NextResponse.next();
  }

  if (
    path.startsWith("/admin") &&
    path !== "/admin/login"
  ) {
    if (!adminToken) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }

    try {
      jwt.verify(
        adminToken,
        process.env.ADMIN_JWT_SECRET!
      );
    } catch {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main/:path*",
    "/profile/:path*",
    "/challenges/:path*",
    "/leaderboard/:path*",
    "/admin/:path*",
  ],
};