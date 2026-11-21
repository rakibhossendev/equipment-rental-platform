
import { env } from "@/config/env-config";
import type { AdminRental } from "../../../../typescript/main";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

export async function getAllRentals(): Promise<AdminRental[]> {
  const token = await getJWTTokenServer();

  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/all-rentals`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const result: { data: AdminRental[]; message: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch rentals");
  }

  return result.data;
}
