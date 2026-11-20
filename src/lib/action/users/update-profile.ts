"use server";

import { env } from "@/config/env-config";
import type { UserType } from "../../../../typescript/main";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

interface ProfileUpdateData {
  name: string;
  image: string;
  phoneNumber: string;
  address: string;
}

export async function updateProfile(data: ProfileUpdateData) {
  const token = await getJWTTokenServer();

  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const result: { data: UserType } = await response.json();
  return result.data;
}