
import { env } from "@/config/env-config";
import type { Equipment } from "../../../../typescript/main";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

interface MyEquipmentsResponse {
    data: Equipment[];
}

export async function myEquipments(): Promise<Equipment[]> {
    const token = await getJWTTokenServer();

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/my-equipments`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch my equipments");
    }

    const result: MyEquipmentsResponse = await response.json();

    return result.data;
}
