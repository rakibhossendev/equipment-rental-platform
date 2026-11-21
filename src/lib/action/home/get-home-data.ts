import { env } from "@/config/env-config";
import type { HomeData } from "../../../../typescript/main";

export async function getHomeData(): Promise<HomeData> {
    const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/home-data`,
        {
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch homepage data");
    }

    return result.data;
}
