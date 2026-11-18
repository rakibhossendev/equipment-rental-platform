
import { Equipment } from "@/app/(public)/_components/equipments/equipment-card";
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

export async function getAllEquipment(query = ""): Promise<{ data: Equipment[] }> {
    console.log(query);
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/equipments?${query}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch equipment");
    }

    return response.json();
}
