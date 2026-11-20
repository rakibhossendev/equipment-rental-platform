
import {
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import { myEquipments } from "@/lib/action/equipment/myEquipment";
import MyEquipmentsTable from "../../_components/owner/MyEquipmentsTable";

export const metadata = {
  title: "My Equipment",
};

export default async function MyEquipments() {
  const equipments = await myEquipments();

  // Summary numbers (same status rules as the table badges:
  // anything that is not approved/rejected counts as pending)
  const total = equipments.length;
  const approved = equipments.filter((item) => item.status?.toLowerCase() === "approved").length;
  const rejected = equipments.filter((item) => item.status?.toLowerCase() === "rejected" ).length;
  const pending = total - approved - rejected;
  const totalUnits = equipments.reduce((sum, item) => sum + (Number(item.availableQuantity) || 0),0);
  const outOfStock = equipments.filter((item) => Number(item.availableQuantity) === 0).length;

  const stats = [
    {
      label: "Total Listings",
      value: total,
      hint: `${totalUnits} ${totalUnits === 1 ? "unit" : "units"} available in total`,
      icon: Package,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      label: "Approved",
      value: approved,
      hint: "Live and ready to rent",
      icon: CheckCircle2,
      iconClass:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    },
    {
      label: "Pending Review",
      value: pending,
      hint: "Waiting for approval",
      icon: Clock,
      iconClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      label: "Rejected",
      value: rejected,
      hint: "Needs changes",
      icon: XCircle,
      iconClass: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    },
  ];

  // Things the owner should pay attention to
  const notices: string[] = [];

  if (rejected > 0) {
    notices.push(
      `${rejected} ${rejected === 1 ? "listing was" : "listings were"} rejected. Edit and resubmit ${rejected === 1 ? "it" : "them"}.`
    );
  }

  if (outOfStock > 0) {
    notices.push(
      `${outOfStock} ${outOfStock === 1 ? "item is" : "items are"} out of stock. Update the available quantity.`
    );
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Equipment
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your equipment listings, rental prices and availability.
          </p>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-start justify-between rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-3xl font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            </div>

            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
            >
              <stat.icon className="size-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Attention Notice */}
      {notices.length > 0 && (
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />

          <div className="space-y-1 text-sm">
            <p className="font-semibold">Needs your attention</p>
            <ul className="list-inside list-disc space-y-0.5">
              {notices.map((notice) => (
                <li key={notice}>{notice}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Equipment Table */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            All Listings
          </h2>
          <p className="text-sm text-muted-foreground">
            Search, view, edit or remove your equipment.
          </p>
        </div>

        <MyEquipmentsTable equipments={equipments} />
      </div>

    </section>
  );
}