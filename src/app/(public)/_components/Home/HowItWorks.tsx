"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, CreditCard, PackageCheck, Search } from "lucide-react";

import SectionHeading from "./SectionHeading";

const steps = [
    {
        icon: Search,
        title: "Search & Browse",
        description:
            "Filter approved equipment by category, price and location.",
    },
    {
        icon: CalendarDays,
        title: "Book Your Dates",
        description:
            "Pick your rental dates and quantity, then confirm the booking.",
    },
    {
        icon: CreditCard,
        title: "Pay Securely",
        description:
            "Check out safely with Stripe — payment is confirmed on delivery.",
    },
    {
        icon: PackageCheck,
        title: "Receive & Return",
        description:
            "Collect the equipment, finish the rental and return it on time.",
    },
];

/**
 * How It Works — four simple steps from search to return.
 */
export default function HowItWorks() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="container-page py-14 sm:py-20">
            <div className="space-y-8">
                <SectionHeading
                    eyebrow="How It Works"
                    title="Rent in Four Simple Steps"
                    description="From your first search to the final return — the whole process takes just a few clicks."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            className="relative rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-6"
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
                            <span className="absolute right-5 top-5 text-3xl font-bold text-brand/20">
                                {index + 1}
                            </span>

                            <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                                <step.icon className="size-5" />
                            </span>

                            <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
