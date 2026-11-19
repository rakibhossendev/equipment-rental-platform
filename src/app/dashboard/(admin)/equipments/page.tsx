
import {
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  Boxes,
} from "lucide-react";
import { Equipment } from "../../../../../typescript/main";
import { getAllEquipment } from "@/lib/action/equipment/getEquipment";
import EquipmentTable from "../../_components/equipments/EquipmentTable";


const statsConfig = [
  {
    title: "Total Equipment",
    key: "total",
    description: "All equipment listings",
    icon: Package,
    iconStyle: "bg-brand/10 text-brand",
  },
  {
    title: "Pending",
    key: "pending",
    description: "Awaiting approval",
    icon: Clock3,
    iconStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    title: "Approved",
    key: "approved",
    description: "Available listings",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Rejected",
    key: "rejected",
    description: "Rejected listings",
    icon: XCircle,
    iconStyle: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
] as const;

export default async function AllEquipmentsPage() {
  let equipments: Equipment[] = [];
  let error = false;

  try {
    const response = await getAllEquipment();
    equipments = response.data;
  } catch (err) {
    console.error("Equipment fetching error:", err);
    error = true;
  }

  const stats = {
    total: equipments.length,
    pending: equipments.filter(
      (item) => item.status === "Pending"
    ).length,
    approved: equipments.filter(
      (item) => item.status === "Approved"
    ).length,
    rejected: equipments.filter(
      (item) => item.status === "Rejected"
    ).length,
  };

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Boxes className="size-5" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Equipment Management
          </h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Review equipment listings, monitor approval status, and manage
          platform inventory.
        </p>
      </div>

      {/* Statistics */}
      {!error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsConfig.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.key}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${stat.iconStyle}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                  {stats[stat.key].toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Equipment Table */}
      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-10 text-center">
          <Package className="mx-auto size-8 text-destructive" />

          <h2 className="mt-3 font-semibold text-foreground">
            Failed to load equipment
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong while fetching equipment data.
            Please refresh the page and try again.
          </p>
        </div>
      ) : (
        <EquipmentTable equipments={equipments} />
      )}
    </main>
  );
}
