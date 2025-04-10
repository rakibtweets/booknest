import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkRole } from "./lib/roles";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/dashboard(.*)",
  "/profile(.*)",
  "/orders(.*)",
  "/wishlist(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/about",
  "/books",
  "/books/:id",
  "/authors",
  "/authors/:id",
  "/publishers",
  "/publishers/:id",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();

  // const isAdmin = await checkRole("admin");
  // // Protect admin routes
  // if (isAdminRoute(req)) {
  //   await auth.protect();
  //   // @ts-ignore
  //   // if (!isAdmin) {
  //   //   return NextResponse.redirect(new URL("/sign-in", req.url));
  //   // }
  // }

  // // Protect user routes
  // if (!isProtectedRoute(req)) {
  //   // await auth.protect();
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
