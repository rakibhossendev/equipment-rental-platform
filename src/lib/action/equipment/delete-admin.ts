"use server";

import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";


export async function deleteEquipment(id: string) {
    const token = await getJWTTokenServer();

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/admin-action/delete/${id}`,{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to delete equipment");
    }

    return result.data;
}