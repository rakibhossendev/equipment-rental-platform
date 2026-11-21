"use server";

import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";
import { getJWTTokenClient } from "@/lib/jwt/getTokenClient";


export async function removeFavorite(favoriteId: string) {
  const token = await getJWTTokenServer();

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/favorites/${favoriteId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to remove favorite");
  }

  return result.data;
}