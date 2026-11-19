'use client'
import Link from "next/link";

import {
  ArrowLeft,
  Home,
  ShieldAlert,
} from "lucide-react";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <section className="w-full max-w-md space-y-5 text-center">
        {/* Emoji */}
        <div
          className="select-none text-6xl leading-none sm:text-7xl"
          role="img"
          aria-label="Face with raised eyebrow"
        >
          🙂‍↔️
        </div>

        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
          <ShieldAlert size={14} />
          Access Restricted
        </div>

        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.3em] text-brand">
            ERROR 403
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Wrong Door!
            <span className="mt-1 block text-destructive">Access Denied.</span>
          </h1>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          Oops! Looks like you&apos;ve entered a restricted area. You don&apos;t
          have permission to access this page.
        </p>

        <div className="rounded-xl border border-border bg-secondary/50 p-3 text-left">
          <p className="text-sm font-semibold text-foreground">
            Why am I seeing this?
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Your account role may not have the required permissions. If you
            believe this is a mistake, please contact the administrator.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Link
            href="/"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition hover:brightness-110 active:scale-[0.98]"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          Need access? Contact your platform administrator.
        </p>
      </section>
    </main>
  );
}