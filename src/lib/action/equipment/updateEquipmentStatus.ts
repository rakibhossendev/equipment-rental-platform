import { env } from "@/config/env-config";
import { EquipmentStatus } from "../../../../typescript/main";
import { getJWTTokenClient } from "@/lib/jwt/getTokenClient";

export async function updateEquipmentStatus(id: string, status: EquipmentStatus) {
    const token = await getJWTTokenClient();

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/update-equipment-status/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update equipment status");
    }

    return result;
}