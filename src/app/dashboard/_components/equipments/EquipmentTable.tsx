"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, Package, CalendarDays } from "lucide-react";
import { toast } from "sonner";

import type {
  Equipment,
  EquipmentStatus,
} from "../../../../../typescript/main";

import { updateEquipmentStatus } from "@/lib/action/equipment/updateEquipmentStatus";

const STATUS_OPTIONS: EquipmentStatus[] = ["Pending", "Approved", "Rejected"];

const STATUS_STYLES: Record<EquipmentStatus, string> = {
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Approved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
};

function EquipmentImage({ equipment }: { equipment: Equipment }) {
  const src = Array.isArray(equipment.equipmentImage)
    ? equipment.equipmentImage[0]
    : equipment.equipmentImage;

  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary">
      {src ? (
        <Image
          src={src}
          alt={equipment.equipmentName}
          fill
          sizes="56px"
          className="object-cover"
        />
      ) : (
        <Package className="size-6" />
      )}
    </div>
  );
}

function StatusControl({
  status,
  onChange,
}: {
  status: EquipmentStatus;
  onChange: (status: EquipmentStatus) => void;
}) {
  return (
    <div className="space-y-2">
      <span
        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
      >
        {status}
      </span>

      <select
        value={status}
        onChange={(e) => onChange(e.target.value as EquipmentStatus)}
        className="h-9 w-full max-w-[140px] rounded-md border border-border bg-background px-2 text-xs outline-none focus:border-brand"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function EquipmentTable({equipments,}: {equipments: Equipment[];}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  
  const [updated, setUpdated] = useState<Record<string, EquipmentStatus>>({});

  const getStatus = (item: Equipment): EquipmentStatus =>
    updated[item._id] ?? item.status ?? "Pending";

  const query = search.toLowerCase();
  const filtered = equipments.filter((item) =>
    [
      item.equipmentName,
      item.category,
      item.location,
      item.creatorEmail,
      item.ownerInformation?.name,
      item.ownerInformation?.email,
    ].some((value) => value?.toLowerCase().includes(query))
  );

  const handleStatusChange = async (id: string, status: EquipmentStatus) => {
    const item = equipments.find((entry) => entry._id === id);
    const previous = updated[id] ?? item?.status ?? "Pending";

    // Optimistic update: reflect the new status in the badge + dropdown immediately
    setUpdated((prev) => ({ ...prev, [id]: status }));

    try {
      const result = await updateEquipmentStatus(id, status);

      if (!result?.success) {
        setUpdated((prev) => ({ ...prev, [id]: previous }));
        toast.error(result?.message || "Failed to update status");
        return;
      }

      toast.success(result.message || "Status updated successfully");
      // Re-fetch server components so the stat cards (Pending/Approved/Rejected) stay in sync
      router.refresh();
    } catch (error) {
      console.error("Status update error:", error);
      setUpdated((prev) => ({ ...prev, [id]: previous }));
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="w-full min-w-0 space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equipment, owner, location..."
            className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {equipments.length} equipment
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-4">
          <h2 className="font-semibold">All Equipment</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review listings and manage equipment approval status.
          </p>
        </div>

        {/* Mobile / Tablet */}
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 xl:hidden">
          {filtered.map((equipment) => (
            <article
              key={equipment._id}
              className="space-y-4 rounded-xl border border-border bg-background p-3"
            >
              <div className="flex items-center gap-3">
                <EquipmentImage equipment={equipment} />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold">
                    {equipment.equipmentName}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {equipment.category}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {equipment.rentalPrice.toLocaleString()} / {equipment.rentalType}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-y border-border py-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="truncate">{equipment.ownerInformation?.name || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p>{equipment.availableQuantity} units</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="flex items-center gap-1 truncate">
                    <MapPin className="size-3.5 shrink-0" />
                    {equipment.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Registration</p>
                  <p className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" />
                    {equipment.createdAt
                      ? new Date(equipment.createdAt).toLocaleDateString("en-GB")
                      : "—"}
                  </p>
                </div>
              </div>

              <StatusControl
                status={getStatus(equipment)}
                onChange={(status) => handleStatusChange(equipment._id, status)}
              />
            </article>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden xl:block">
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
                {["Equipment", "Owner", "Price", "Status"].map((heading) => (
                  <th key={heading} className="px-3 py-4 first:pl-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filtered.map((equipment) => (
                <tr key={equipment._id} className="hover:bg-muted/30">
                  <td className="px-3 py-3 pl-4">
                    <div className="flex items-center gap-3">
                      <EquipmentImage equipment={equipment} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {equipment.equipmentName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {equipment.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <p className="truncate font-medium">
                      {equipment.ownerInformation?.name || "—"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {equipment.ownerInformation?.email || equipment.creatorEmail}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    {equipment.rentalPrice.toLocaleString()}
                    <p className="text-xs text-muted-foreground">
                      / {equipment.rentalType}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <StatusControl
                      status={getStatus(equipment)}
                      onChange={(status) =>
                        handleStatusChange(equipment._id, status)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-14 text-center">
            <Package className="mx-auto size-9 text-muted-foreground" />
            <h3 className="mt-3 font-semibold">No equipment found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}