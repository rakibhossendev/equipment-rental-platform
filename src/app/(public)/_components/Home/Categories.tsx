"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { homeCategories } from "./categories-data";

/**
 * Categories — the six fixed equipment categories. Each card
 * links to the All Equipment page pre-filtered by category.
 */
export default function Categories() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="container-page py-14 sm:py-20">
            <div className="space-y-8">
                <SectionHeading
                    eyebrow="Browse by Category"
                    title="Equipment Categories"
                    description="Jump straight to the category you need — every listing is approved and ready to rent."
                />

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {homeCategories.map((category, index) => (
                        <motion.div
                            key={category.value}
                            className="h-full"
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 16 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: Math.min(index, 5) * 0.06,
                            }}
                        >
                            <Link
                                href={`/equipments?category=${category.value}`}
                                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 text-center backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-5"
                            >
                                <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-brand-foreground">
                                    <category.icon className="size-6" />
                                </span>

                                <span className="text-sm font-semibold leading-snug text-foreground">
                                    {category.label}
                                </span>

                                <span className="text-xs leading-5 text-muted-foreground">
                                    {category.description}
                                </span>

                                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                                    Explore
                                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
