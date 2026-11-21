import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "../auth";

export async function requireRole(...allowedRoles: string[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/unauthorized");
  }

  return session;
}