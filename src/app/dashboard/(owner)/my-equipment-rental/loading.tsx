import { Skeleton } from "@/components/ui/skeleton";

export default function MyEquipmentRentalLoading() {
  return (
    <section className="w-full space-y-6 px-4 py-6 md:px-6 md:py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56 rounded" />
        <Skeleton className="h-4 w-72 rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="mt-2 h-7 w-16 rounded" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <Skeleton className="mb-4 h-6 w-36 rounded" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}
