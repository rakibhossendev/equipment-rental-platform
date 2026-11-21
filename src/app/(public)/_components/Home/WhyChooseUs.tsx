"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, CalendarRange, ShieldCheck, Tag } from "lucide-react";

import SectionHeading from "./SectionHeading";

const benefits = [
    {
        icon: Tag,
        title: "Affordable Rental Prices",
        description:
            "Competitive daily, weekly and monthly rates with no hidden fees.",
    },
    {
        icon: BadgeCheck,
        title: "Verified Equipment Owners",
        description:
            "Every listing comes from vetted, trusted owners on the platform.",
    },
    {
        icon: CalendarRange,
        title: "Flexible Rental Periods",
        description:
            "Rent by the day, week or month — extend your booking when plans change.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payments",
        description:
            "Payments are processed through Stripe and only confirmed on delivery.",
    },
];

/**
 * Why Choose Us — the four core platform benefits.
 */
export default function WhyChooseUs() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="container-page py-14 sm:py-20">
            <div className="space-y-8">
                <SectionHeading
                    eyebrow="Why Choose Us"
                    title="Built for Hassle-Free Rentals"
                    description="Everything you need to rent equipment with confidence, from search to return."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-6"
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
                            <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                <benefit.icon className="size-5" />
                            </span>

                            <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                                {benefit.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
