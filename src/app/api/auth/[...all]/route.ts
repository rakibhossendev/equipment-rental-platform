import { auth } from "@/lib/auth";
import { clientPromise } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const authHandlers = toNextJsHandler(auth);

export const GET = async (req: NextRequest) => {
  await clientPromise;
  return authHandlers.GET(req);
};

export const POST = async (req: NextRequest) => {
  await clientPromise;
  return authHandlers.POST(req);
};
