
"use server";

import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";
import type { EquipmentDataType } from "../../../../typescript/main";

type UpdateMyEquipmentData = Partial<
    Omit<
        EquipmentDataType,
        "id" | "creatorEmail" | "status" | "ownerInformation" | "equipmentImage"
    >
> & {
    equipmentImage?: string | string[];
    ownerInformation?: {
        name?: string;
        phone?: string;
        address?: string;
    };
};

export async function updateMyEquipment(
    id: string,
    updateData: UpdateMyEquipmentData
) {
    const token = await getJWTTokenServer();

    const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/owner-action/update/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update equipment");
    }

    return result.data;
}
