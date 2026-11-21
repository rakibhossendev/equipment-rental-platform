"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, LayoutDashboard } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error summary for diagnostics without exposing sensitive details
    console.error("Application error boundary caught an error:", error.message);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
          <AlertTriangle className="size-8" />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-destructive">
          Something went wrong
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          An Unexpected Error Occurred
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          We encountered an error while processing your request. Please try again or return to the dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto"
            size="lg"
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>

          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Home className="size-3.5" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
