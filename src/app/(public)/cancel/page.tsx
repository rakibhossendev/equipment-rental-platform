import Link from "next/link";
import { XCircle, ArrowRight, RefreshCcw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Payment Cancelled - EquipRent",
  description: "Your rental payment checkout was cancelled.",
};

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <XCircle className="size-8" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Checkout Status
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Your Stripe payment session was cancelled. No charges were processed, and your card was not billed.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/equipments"
            className={buttonVariants({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <RefreshCcw className="mr-2 size-4" />
            Browse Other Equipment
          </Link>

          <Link
            href="/dashboard/my-rentals"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            My Rentals
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Have questions about booking? Feel free to contact our support team or check our rental policies.
          </p>
        </div>
      </div>
    </main>
  );
}
