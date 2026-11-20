import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

export async function profileData() {
  try {
    const token = await getJWTTokenServer();
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,{
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result = await response.json();
    
    return result.data;
  } catch (error) {
    console.error("Profile API Error:", error);
    throw error;
  }
}