
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border border-border bg-secondary">
          <SearchX className="size-10 text-muted-foreground" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand">
          Page Not Found
        </p>

        <h1 className="text-8xl font-extrabold tracking-tight text-foreground sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Oops! Page not found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </button>
        </div>

        <div className="mt-16 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Need help? Explore equipment rentals from our homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
