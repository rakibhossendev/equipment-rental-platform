import { env } from "@/config/env-config";
import { getJWTTokenClient } from "@/lib/jwt/getTokenClient";


interface AddFavoriteResponse {
  data: {
    _id: string;
    equipmentId: string;
    userId: string;
    userEmail: string;
    equipmentName: string;
    category: string;
    equipmentImage: string | string[];
    createdAt: string;
  };
}

export async function addFavorite(equipmentId: string) {
  const token = await getJWTTokenClient();

  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/favorites`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ equipmentId }),
      cache: "no-store",
    }
  );

  const result: AddFavoriteResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      (result as { message?: string }).message ||
        "Failed to add favorite"
    );
  }

  return result.data;
}