

import { env } from "@/config/env-config";
import { Equipment, EquipmentListResponse } from "../../../../typescript/main";

export async function getAllEquipment(query = ""): Promise<EquipmentListResponse> {

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/equipments?${query}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch equipment");
    }

    return response.json();
}


export async function getAllEquipmentForAdmin(): Promise<EquipmentListResponse> {

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/equipments/all-equipments`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch equipment");
    }

    return response.json();
}


export async function getEquipmentDetails(id: string): Promise<Equipment> {
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/equipments/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch equipment details");
    }

    const result: Equipment = await response.json();
    
    return result;
}
