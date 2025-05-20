import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  apiAuthPrefix,
  publicRoutes,
} from "@/route";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = await auth();
  const isLoggedIn = session?.user ? true : false;

  const { nextUrl } = req;
  const isApiAuth = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuth = authRoutes.includes(nextUrl.pathname);

  if (isApiAuth) return NextResponse.next();

  if(isAuth){
    if(isLoggedIn){
      console.log("is logged in");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
