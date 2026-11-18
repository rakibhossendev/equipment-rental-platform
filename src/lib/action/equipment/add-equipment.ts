
import { env } from "@/config/env-config";
import { EquipmentDataType } from "../../../../typescript/main";

export async function addEquipment(data: EquipmentDataType) {
    try {
        const response = await fetch(
            `${env.NEXT_PUBLIC_API_BASE_URL}/add-equipment`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to add equipment."
            );
        }

        return result;

    } catch (error) {
        console.error("Error adding equipment:", error);
        throw error;
    }
}
