import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const roleBasedRoutes = {
  user: ["/userRoute"],
  admin: ["/adminRoute"],
};

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("PATH:", pathname);
  console.log("TOKEN:", token);
  console.log("ROLE:", token?.role);

  // No login
  if (!token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.href
    );

    return NextResponse.redirect(loginUrl);
  }

  // No role
  if (!token.role || !roleBasedRoutes[token.role]) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.href
    );

    return NextResponse.redirect(loginUrl);
  }

  const allowedRoutes = roleBasedRoutes[token.role];

  const hasAccess = allowedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!hasAccess) {
    // Login page-এ না পাঠিয়ে unauthorized/home-এ পাঠানো better
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminRoute/:path*", "/userRoute/:path*"],
};