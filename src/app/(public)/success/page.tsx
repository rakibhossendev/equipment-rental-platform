import Link from "next/link";
import {
  CheckCircle2,
  ReceiptText,
  Mail,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Payment Successful",
};

const nextSteps = [
  {
    icon: Mail,
    title: "Confirmation email",
    description: "Stripe will send a payment receipt to your email address.",
  },
  {
    icon: PackageCheck,
    title: "Owner confirmation",
    description:
      "The equipment owner will confirm your booking and arrange collection with you.",
  },
  {
    icon: ReceiptText,
    title: "Track your rental",
    description: "You can see your booking details anytime from your dashboard.",
  },
];

const SuccessPage = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-2xl items-center px-4 py-10 sm:px-6">
      <Card className="w-full border-border/70 shadow-sm">
        <CardContent className="space-y-8 p-6 sm:p-10">

          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 className="size-10 text-green-600 dark:text-green-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Payment Successful
              </h1>

              <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                Thank you for your payment. Your rental request has been
                received and is now being processed.
              </p>
            </div>
          </div>

          {/* What happens next */}
          <div className="space-y-4 rounded-xl border border-border bg-muted/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              What happens next
            </h2>

            <ul className="space-y-4">
              {nextSteps.map((step) => (
                <li key={step.title} className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm ring-1 ring-border">
                    <step.icon className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/my-rentals"
              className={buttonVariants({
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Go to Dashboard
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/equipments"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Browse More Equipment
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            If you have any problem with your payment, please contact the
            equipment owner or our support team.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default SuccessPage;