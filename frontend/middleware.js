import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data } = await supabase.auth.getSession();

  if (
    data.session &&
    (req.nextUrl.pathname.match("/registration/.*") ||
      req.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  } else if (!data.session && !req.nextUrl.pathname.match("/registration/.*")) {
    return NextResponse.redirect(new URL("/registration/signin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/registration/:path*", "/home/:path*"],
};
