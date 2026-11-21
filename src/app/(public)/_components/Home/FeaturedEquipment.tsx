"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PackageSearch } from "lucide-react";

import EquipmentCard from "../equipments/equipment-card";
import SectionHeading from "./SectionHeading";
import type { Equipment } from "../../../../../typescript/main";

interface FeaturedEquipmentProps {
    equipment: Equipment[];
    isLoggedIn: boolean;
}

/**
 * Featured Equipment — 6 approved items from GET /home-data.
 * View Details links to the login page when the visitor is not
 * signed in, otherwise to the equipment details page.
 */
export default function FeaturedEquipment({
    equipment,
    isLoggedIn,
}: FeaturedEquipmentProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section className="container-page py-14 sm:py-20">
            <div className="space-y-8">
                <SectionHeading
                    eyebrow="Featured Equipment"
                    title="Top Picks for Your Next Project"
                    description="Approved and ready-to-rent equipment, freshly listed by verified owners."
                />

                {equipment.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {equipment.map((item, index) => (
                            <motion.div
                                key={item._id}
                                className="h-full"
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
                                <EquipmentCard
                                    equipment={item}
                                    detailsHref={
                                        isLoggedIn
                                            ? `/equipments/${item._id}`
                                            : "/sign-in"
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-5 text-center">
                        <PackageSearch className="mb-4 size-10 text-muted-foreground/50" />

                        <h3 className="text-lg font-semibold text-foreground">
                            Featured equipment is unavailable right now
                        </h3>

                        <p className="mt-1 max-w-md text-sm text-muted-foreground">
                            Please check back soon — new approved equipment is
                            added every day.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
