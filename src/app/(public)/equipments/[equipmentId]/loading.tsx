import { Skeleton } from "@/components/ui/skeleton";

export default function EquipmentDetailsLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Skeleton className="h-9 w-36 rounded-lg" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />

          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-2/3 rounded-lg" />
            <Skeleton className="h-4 w-1/3 rounded-md" />
          </div>

          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="mb-4 h-6 w-44 rounded-md" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-4 w-28 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          <div className="space-y-5 rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-40 rounded" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>

          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-6 w-36 rounded" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-44 rounded" />
              </div>
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
