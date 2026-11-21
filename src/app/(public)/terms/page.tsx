import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service - EquipRent",
  description: "Terms and conditions for using the EquipRent platform.",
};

export default function TermsPage() {
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
          <FileText className="size-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: November 2026
          </p>
        </div>
      </div>

      <div className="space-y-8 rounded-2xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground shadow-sm sm:p-8">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using EquipRent, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            2. User Roles & Responsibilities
          </h2>
          <p>
            EquipRent provides a marketplace connecting equipment owners with renters. Owners are responsible for the condition, availability, and legal ownership of listed equipment. Renters are responsible for returning equipment on time in the condition received.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            3. Rental Bookings & Payments
          </h2>
          <p>
            All rental payments are securely processed through Stripe. Rental duration is calculated based on daily, weekly, or monthly agreements. Bookings are confirmed upon successful payment verification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            4. Cancellation & Refund Policy
          </h2>
          <p>
            Cancellation requests must be submitted prior to the scheduled rental start date. Refund eligibility depends on the timing of cancellation and specific equipment owner terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            5. Damage, Loss & Liability
          </h2>
          <p>
            Renters assume responsibility for any damage, loss, or theft of equipment during the rental period. EquipRent acts solely as an intermediary and is not liable for direct physical damage or misuse.
          </p>
        </section>
      </div>
    </div>
  );
}
