import { env } from "@/config/env-config";
import { FavoriteEquipment } from "../../../../typescript/main";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

interface FavoritesResponse {
    data: FavoriteEquipment[];
}

export async function getFavorites(): Promise<FavoriteEquipment[]> {
    const token = await getJWTTokenServer();
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const result: FavoritesResponse = await response.json();

    if (!response.ok) {
        throw new Error("Failed to fetch favorites");
    }

    return result.data;
}