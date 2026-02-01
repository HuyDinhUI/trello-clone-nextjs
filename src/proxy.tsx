import { NextRequest, NextResponse } from "next/server";

const PRIVATE_PATHS = ["/dashboard", "/admin", "/board"];

const AUTH_PATHS = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const isPrivateRoute = PRIVATE_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  const isAuthRoute = AUTH_PATHS.includes(pathname);

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard/boards", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/board/:path*",
    "/login",
    "/register"
  ],
};
