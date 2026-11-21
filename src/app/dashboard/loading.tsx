import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="flex h-16 items-center gap-3 border-b border-border px-4 md:px-6">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="h-5 w-24 rounded-md" />
        <div className="ml-auto">
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-6 lg:p-8">
        {/* Welcome banner */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-8 w-48 rounded" />
            <Skeleton className="h-4 w-96 max-w-full rounded" />
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-none">
              <div className="flex items-center justify-between pb-3">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="size-9 rounded-xl" />
              </div>
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="mt-2 h-3 w-32 rounded" />
            </div>
          ))}
        </div>

        {/* Charts / Activity skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="mb-4 h-6 w-36 rounded" />
            <Skeleton className="h-56 w-full rounded-lg" />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Skeleton className="mb-4 h-6 w-36 rounded" />
            <Skeleton className="h-56 w-full rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  );
}
