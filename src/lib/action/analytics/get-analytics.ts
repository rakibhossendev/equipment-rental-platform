"use server";

import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

export type MonthlyRevenueData = {
    month: string;
    revenue: number;
};

export type MonthlyBookingData = {
    month: string;
    bookings: number;
};

export type MonthlyEarningsData = {
    month: string;
    earnings: number;
};

export type DistributionData = {
    category?: string;
    status?: string;
    count: number;
};

export type DashboardAnalyticsData = {
    role: "admin" | "owner" | "customer";
    overview: Record<string, number>;
    charts?: {
        monthlyRevenue?: MonthlyRevenueData[];
        monthlyBookings?: MonthlyBookingData[];
        monthlyEarnings?: MonthlyEarningsData[];
        monthlyRentals?: MonthlyBookingData[];
        categoryDistribution?: DistributionData[];
        statusDistribution?: DistributionData[];
    } | null;
};

export async function getDashboardAnalytics(): Promise<DashboardAnalyticsData | null> {
    try {
        const token = await getJWTTokenServer();

        const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/analytics/dashboard-stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Analytics fetch failed with status:", response.status);
            return null;
        }

        const result = await response.json();
        return result.data || null;
    } catch (error) {
        console.error("Error fetching dashboard analytics:", error);
        return null;
    }
}
