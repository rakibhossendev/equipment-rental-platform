"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3 } from "lucide-react";

import SectionHeading from "./SectionHeading";
import type { HomeStats } from "../../../../../typescript/main";

interface PlatformStatsProps {
    stats: HomeStats | null;
}

/**
 * Platform Stats — live numbers from GET /home-data.
 * When the API is unavailable the section still renders with
 * "—" placeholder values (same pattern as the dashboard).
 */
export default function PlatformStats({ stats }: PlatformStatsProps) {
    const reduceMotion = useReducedMotion();

    const items = [
        {
            label: "Approved Equipment",
            value: stats ? stats.totalEquipment.toLocaleString("en-BD") : "—",
        },
        {
            label: "Equipment Owners",
            value: stats ? stats.totalOwners.toLocaleString("en-BD") : "—",
        },
        {
            label: "Happy Customers",
            value: stats ? stats.totalCustomers.toLocaleString("en-BD") : "—",
        },
        {
            label: "Completed Rentals",
            value: stats ? stats.completedRentals.toLocaleString("en-BD") : "—",
        },
    ];

    return (
        <section className="container-page py-14 sm:py-20">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-2xl sm:p-10">
                <div className="space-y-8">
                    <SectionHeading
                        eyebrow="Platform Stats"
                        title="A Growing Rental Marketplace"
                        description="Real numbers from the platform — updated every time the homepage loads."
                    />

                    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.label}
                                className="rounded-2xl border border-border/50 bg-background/50 p-4 text-center sm:p-5"
                                initial={
                                    reduceMotion
                                        ? false
                                        : { opacity: 0, y: 16 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                    delay: Math.min(index, 5) * 0.06,
                                }}
                            >
                                <BarChart3 className="mx-auto size-5 text-brand" />

                                <p className="mt-3 text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                                    {item.value}
                                </p>

                                <p className="mt-1 text-xs font-medium leading-5 text-muted-foreground sm:text-sm">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
