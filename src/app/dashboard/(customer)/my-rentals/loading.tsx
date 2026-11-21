import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerMyRentalsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 rounded" />
        <Skeleton className="h-4 w-64 rounded" />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
