import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function getUser() {
  const user = await currentUser();
  if (!user) return null;
  const clerkRole = user.publicMetadata.role;
  const userRole = clerkRole === "admin" ? "admin" : "user";

  const data = await prisma.user.upsert({
    where: {
      clerkUserId: user.id,
    },
    create: {
      clerkUserId: user.id,
      email:
        user.emailAddresses[0].emailAddress ||
        user.primaryEmailAddress?.emailAddress,
      role: userRole,
    },
    update: {
      role: userRole,
      name: user.fullName,
    },
  });
  return data;
}

