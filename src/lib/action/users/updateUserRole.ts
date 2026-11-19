import { env } from "@/config/env-config";
import { UserRole } from "../../../../typescript/main";
import { getJWTTokenClient } from "@/lib/jwt/getTokenClient";

export async function updateUserRole(userId: string, role: UserRole) {
    const token = await getJWTTokenClient();

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/update-user-role/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
    }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update user role");
    }

    return result;
}