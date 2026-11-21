import { Skeleton } from "@/components/ui/skeleton";

export default function OwnerMyEquipmentsLoading() {
  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-44 rounded" />
        <Skeleton className="h-4 w-72 rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="mt-2 h-8 w-16 rounded" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}
