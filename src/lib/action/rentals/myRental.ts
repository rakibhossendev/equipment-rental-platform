import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";
import { RentalBooking } from "../../../../typescript/main";


export async function myRentals(): Promise<RentalBooking[]> {
  const token = await getJWTTokenServer();

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/my-rentals`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch my rentals");
  }

  const result: { data: RentalBooking[] } = await response.json();

  return result.data;
}