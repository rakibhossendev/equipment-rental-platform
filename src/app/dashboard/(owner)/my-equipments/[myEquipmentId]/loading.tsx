import { Skeleton } from "@/components/ui/skeleton";

export default function OwnerEquipmentDetailsLoading() {
  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl space-y-8 px-4 py-6 md:px-6 lg:py-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-44 rounded" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-6 w-36 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-4 rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-8 w-36 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
