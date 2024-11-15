import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isDashboardRoute = createRouteMatcher([
  "/book-appointment",
  "/blood-availability-search",
]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isDashboardRoute(req) || isAdminRoute(req)) {
    await auth.protect(); // This will redirect unauthenticated users to the sign-in page
  }

  const authData = await auth();
  const userId = authData.userId;

  const client = await clerkClient();
  let role = "user";
  if (userId) {
    const user = await client.users.getUser(userId);
    role = user.publicMetadata.role as string;
  }

  if (role !== "admin" && isAdminRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
