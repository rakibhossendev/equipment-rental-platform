

import { env } from "@/config/env-config";
import { Equipment } from "../../../../typescript/main";

export type EquipmentFilterParams = {
    search?: string;
    category?: string;
    rentalType?: "Daily" | "Weekly" | "Monthly";
    minPrice?: number;
    maxPrice?: number;
    availability?: boolean;
    sort?: "price-asc" | "price-desc" | "newest";
    page?: number;
    limit?: number;
};

export async function getAllEquipment(query = ""): Promise<{ data: Equipment[] }> {

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/equipments?${query}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch equipment");
    }

    return response.json();
}


export async function getAllEquipmentForAdmin(): Promise<{ data: Equipment[] }> {

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
