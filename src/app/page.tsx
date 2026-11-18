
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  HardHat,
  Camera,
  CarFront,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import Navbar from "./(public)/_components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="pointer-events-none absolute -right-40 -top-32 size-[500px] rounded-full bg-brand/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand/5 blur-[100px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Hero Content */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
                <Sparkles className="size-4" />
                Equipment rental, made simple
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                The Right Equipment.
                <span className="mt-2 block text-brand">
                  Right When You Need It.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                From construction machinery to photography gear, discover
                equipment you need without the cost of owning it.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/all-equipments"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition hover:opacity-90"
                >
                  Explore Equipment
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/dashboard/add-equipment"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-6 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:bg-secondary"
                >
                  List Your Equipment
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              {/* Highlights */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border/70 pt-7">
                <div>
                  <p className="text-2xl font-bold text-foreground">Easy</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Equipment discovery
                  </p>
                </div>

                <div className="h-10 w-px bg-border" />

                <div>
                  <p className="text-2xl font-bold text-foreground">
                    Flexible
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Rental options
                  </p>
                </div>

                <div className="h-10 w-px bg-border" />

                <div>
                  <p className="text-2xl font-bold text-foreground">Simple</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Rental experience
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-brand/10 blur-2xl" />

              <div className="glass-card relative overflow-hidden rounded-[2rem] border border-border/70 p-3 sm:p-4">
                <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-secondary/70 p-6 sm:min-h-[460px] sm:p-8">
                  <div className="absolute -right-20 -top-20 size-72 rounded-full border border-brand/20" />
                  <div className="absolute -right-10 -top-10 size-52 rounded-full border border-brand/20" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">
                      EQUIPRENT MARKETPLACE
                    </span>

                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="size-2 rounded-full bg-brand" />
                      Explore freely
                    </span>
                  </div>

                  <div className="relative z-10 py-10">
                    <div className="mx-auto flex size-44 items-center justify-center rounded-full border border-brand/20 bg-brand/10 shadow-2xl shadow-brand/10 sm:size-56">
                      <HardHat
                        className="size-24 text-brand sm:size-32"
                        strokeWidth={1.1}
                      />
                    </div>

                    <p className="mt-7 text-center text-2xl font-bold text-foreground sm:text-3xl">
                      Make Every Project
                      <span className="block text-brand">
                        Move Forward.
                      </span>
                    </p>
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-2">
                    {[
                      { icon: HardHat, label: "Construction" },
                      { icon: Camera, label: "Photography" },
                      { icon: CarFront, label: "Vehicles" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="glass rounded-xl border border-border/60 px-2 py-3 text-center"
                      >
                        <item.icon className="mx-auto size-5 text-brand" />
                        <p className="mt-2 text-[10px] font-medium text-foreground sm:text-xs">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card absolute -left-5 top-1/4 hidden items-center gap-3 rounded-2xl border border-border/70 p-3 shadow-xl sm:flex">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <ShieldCheck className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Approved Listings
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Quality-focused marketplace
                  </p>
                </div>
              </div>

              <div className="glass-card absolute -bottom-5 -right-3 hidden items-center gap-3 rounded-2xl border border-border/70 p-3 shadow-xl sm:flex">
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Truck className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Ready to Rent
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Find what you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
