import { env } from "@/config/env-config";
import type { UsersApiResponse, UserType } from "../../../../typescript/main";



export async function getUsers(): Promise<UserType[]> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UsersApiResponse = await response.json();

  return result.data;
}