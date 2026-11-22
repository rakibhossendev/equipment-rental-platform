
import Link from "next/link";
import {
  HardHat,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import SignupForm from "../_components/SignupForm";
import Navbar from "@/app/(public)/_components/Navbar/Navbar";



const benefits = [
  "Access a wide range of equipment",
  "Connect with trusted equipment owners",
  "Manage your rentals in one place",
];

export default async function SignUpPage() {
  

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-background">
        {/* Ambient Background */}
        <div className="pointer-events-none absolute -left-40 -top-40 size-[450px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 size-[450px] rounded-full bg-brand/10 blur-[120px]" />

        <div className="relative mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-2">

          {/* Left: Brand Section */}
          <section className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex xl:p-16">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-10 top-20 size-72 rounded-full border border-brand/10" />
              <div className="absolute right-20 top-32 size-52 rounded-full border border-brand/10" />
              <div className="absolute bottom-20 left-10 size-64 rounded-full bg-brand/5 blur-3xl" />
            </div>

            {/* Brand */}
            <Link href="/" className="relative flex w-fit items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-lg shadow-brand/20">
                <HardHat size={25} strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-xl font-bold tracking-tight text-foreground">
                  Equip<span className="text-brand">Rent</span>
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Equipment Marketplace
                </p>
              </div>
            </Link>

            {/* Main Content */}
            <div className="relative my-16 max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-xs font-semibold text-brand">
                <span className="size-2 animate-pulse rounded-full bg-brand" />
                Your project starts here
              </div>

              <h1 className="text-4xl font-bold leading-[1.2] tracking-tight text-foreground xl:text-5xl">
                The right equipment.
                <br />
                <span className="text-brand">The right opportunity.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
                Discover, rent, and manage equipment with a smarter marketplace
                built for contractors, businesses, and project owners.
              </p>

              {/* Feature List */}
              <div className="mt-10 space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <CheckCircle2 size={16} />
                    </div>

                    <span className="text-sm font-medium text-foreground/80">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative Equipment Cards */}
              <div className="mt-12 grid max-w-md grid-cols-3 gap-3">
                <div className="glass-card rounded-2xl p-4">
                  <Truck className="mb-3 size-6 text-brand" />
                  <p className="text-xs font-semibold text-foreground">
                    Heavy Equipment
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <Wrench className="mb-3 size-6 text-brand" />
                  <p className="text-xs font-semibold text-foreground">
                    Professional Tools
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <ShieldCheck className="mb-3 size-6 text-brand" />
                  <p className="text-xs font-semibold text-foreground">
                    Trusted Rentals
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative flex items-center justify-between border-t border-border/60 pt-6">
              <p className="text-xs text-muted-foreground">
                © 2026 EquipRent. All rights reserved.
              </p>

              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                Built for better projects
                <ArrowUpRight size={13} />
              </span>
            </div>
          </section>

          {/* Right: Signup Form */}
          <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 lg:border-l lg:border-border/50 lg:px-12">
            <div className="w-full max-w-[440px]">

              {/* Mobile Brand */}
              <div className="mb-9 flex justify-center lg:hidden">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-md">
                    <HardHat size={23} />
                  </div>

                  <span className="text-xl font-bold tracking-tight text-foreground">
                    Equip<span className="text-brand">Rent</span>
                  </span>
                </Link>
              </div>

              {/* Form Card */}
              <div className="glass-card rounded-3xl p-6 shadow-xl shadow-foreground/[0.04] sm:p-9">
                <div className="mb-8">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <HardHat size={25} />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Get started today
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Create your account
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Join EquipRent and get access to a smarter equipment rental
                    experience.
                  </p>
                </div>

                <SignupForm />
              </div>

              {/* Bottom Note */}
              <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
                By creating an account, you can explore equipment and connect
                with the rental marketplace.
              </p>

              <div className="mt-5 flex justify-center gap-5 text-xs text-muted-foreground">
                <Link href="/terms" className="transition-colors hover:text-brand">
                  Terms
                </Link>
                <Link href="/privacy" className="transition-colors hover:text-brand">
                  Privacy
                </Link>
                <Link href="/" className="transition-colors hover:text-brand">
                  Back to home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
