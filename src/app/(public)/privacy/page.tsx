import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy - EquipRent",
  description: "Privacy policy and data protection practices on EquipRent.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "mb-6 -ml-3 text-muted-foreground hover:text-foreground",
        })}
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to Home
      </Link>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Shield className="size-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: November 2026
          </p>
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground shadow-sm sm:p-8">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you provide when registering, including your name, email address, phone number, and optional profile picture. For equipment owners, location and contact details are collected to facilitate rental coordination.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used to facilitate rental bookings, verify accounts, process secure transactions, and communicate updates about your rentals. We do not sell your personal data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            3. Payment Processing & Security
          </h2>
          <p>
            Financial transactions are encrypted and processed securely by Stripe. We never store credit card numbers, CVVs, or full payment credentials on our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            4. Cookies & Session Storage
          </h2>
          <p>
            We use secure session cookies to authenticate your identity and remember your preferences across sessions. You can control cookie preferences in your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            5. Your Rights & Data Control
          </h2>
          <p>
            You have the right to access, update, or request deletion of your account information at any time from your account settings page or by contacting our team.
          </p>
        </section>
      </div>
    </div>
  );
}
