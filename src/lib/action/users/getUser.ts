import { env } from "@/config/env-config";
import type { UsersApiResponse, UserType } from "../../../../typescript/main";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";



export async function getUsers(): Promise<UserType[]> {
  const token = await getJWTTokenServer();
  console.log("Token in getUsers:", token);
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UsersApiResponse = await response.json();

  return result.data;
}