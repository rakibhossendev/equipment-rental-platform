"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Info, Star } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { demoReviews } from "./reviews-data";

/**
 * Customer Reviews — renders clearly-labelled demo data.
 * The reviews are NOT real verified testimonials; see
 * reviews-data.ts for details.
 */
export default function CustomerReviews() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="container-page py-14 sm:py-20">
            <div className="space-y-8">
                <div className="space-y-4">
                    <SectionHeading
                        eyebrow="Customer Reviews"
                        title="What Renters Are Saying"
                        description="A quick look at the kind of feedback renters leave after a successful rental."
                    />

                    {/* Demo content label — keeps placeholder reviews
                        from being mistaken for real testimonials. */}
                    <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Info className="size-3.5" />
                        Demo content — sample reviews, not verified testimonials
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {demoReviews.map((review, index) => (
                        <motion.figure
                            key={review.name}
                            className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-2xl sm:p-6"
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
                            {/* Rating */}
                            <div
                                className="flex items-center gap-0.5"
                                aria-label={`${review.rating} out of 5 stars`}
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={
                                            star <= review.rating
                                                ? "size-4 fill-brand text-brand"
                                                : "size-4 text-muted-foreground/40"
                                        }
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <blockquote className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                                “{review.comment}”
                            </blockquote>

                            {/* Reviewer */}
                            <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                                    {review.initials}
                                </span>

                                <span className="min-w-0">
                                    <span className="block truncate text-sm font-semibold text-foreground">
                                        {review.name}
                                    </span>
                                    <span className="block text-xs text-muted-foreground">
                                        Customer
                                    </span>
                                </span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
