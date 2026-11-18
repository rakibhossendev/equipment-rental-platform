
import { env } from "@/config/env-config";

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

export async function getAllEquipment(params: EquipmentFilterParams = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.set(key, String(value));
        }
    });

    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/equipments?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch equipment");
    }

    return response.json();
}
