
"use client";

import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Truck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const Banner = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className="relative isolate flex min-h-[520px] items-center overflow-hidden rounded-2xl bg-cover bg-center sm:min-h-[580px] lg:min-h-[640px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=90')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <span className="size-2 rounded-full bg-green-400" />
              Smart Equipment Rental Platform
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              The Right Equipment.
              <span className="mt-2 block text-green-400">
                Right When You Need It.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Find and rent quality equipment for your projects without the
              hassle of ownership. Explore, compare, and book the right tools
              in just a few clicks.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/equipments"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700"
              >
                Explore Equipment
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/equipments"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Search className="size-4" />
                Find What You Need
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/20 pt-6">
              <div className="flex items-center gap-2 text-sm text-white/85">
                <ShieldCheck className="size-5 text-green-400" />
                Trusted Rentals
              </div>

              <div className="flex items-center gap-2 text-sm text-white/85">
                <Truck className="size-5 text-green-400" />
                Easy Booking
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
