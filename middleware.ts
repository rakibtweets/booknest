import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/api/checkout",
  "/api/stripe/webhook",
  "/api/webhook(.*)",
  "/about",
  "/books",
  "/faq",
  "/privacy",
  "/terms",
  "/books/:id",
  "/authors",
  "/authors/:id",
  "/publishers",
  "/publishers/:id",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    // Check if the user has the 'admin' role
    const isAdmin = sessionClaims?.metadata?.roles?.includes("admin");
    if (!isAdmin) {
      const url = new URL("/unauthorized", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
