"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Package,
  Pencil,
  Trash2,
  SlidersHorizontal,
  CalendarDays,
} from "lucide-react";

import type { Equipment, EquipmentStatus } from "../../../../../typescript/main";

interface EquipmentTableProps {
  equipments: Equipment[];
}

const statusStyles: Record<EquipmentStatus, string> = {
  Pending:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Approved:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Rejected:
    "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
};

const getImage = (equipment: Equipment) =>
  Array.isArray(equipment.equipmentImage)
    ? equipment.equipmentImage[0]
    : equipment.equipmentImage;

const getOwnerEmail = (equipment: Equipment) =>
  equipment.ownerInformation?.email || equipment.creatorEmail || "—";

const formatDate = (date?: string) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

function EquipmentImage({ equipment }: { equipment: Equipment }) {
  const image = getImage(equipment);

  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary">
      {image ? (
        <Image
          src={image}
          alt={equipment.equipmentName}
          fill
          sizes="56px"
          className="object-cover"
        />
      ) : (
        <Package className="size-6 text-muted-foreground" />
      )}
    </div>
  );
}

function StatusSelect({
  status,
  equipment,
  onChange,
}: {
  status: EquipmentStatus | "";
  equipment: Equipment;
  onChange: (equipment: Equipment, status: EquipmentStatus) => void;
}) {
  return (
    <div className="space-y-2">
      {status ? (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
        >
          {status}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">Not set</span>
      )}

      <select
        aria-label={`Change status for ${equipment.equipmentName}`}
        value={status}
        onChange={(e) => onChange(equipment, e.target.value as EquipmentStatus)}
        className="h-9 w-full max-w-[140px] rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
      >
        <option value="" disabled>
          Set status
        </option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}

function EquipmentActions({ equipment }: { equipment: Equipment }) {
  const onAction = (action: "Edit" | "Delete") =>
    console.log(`${action} equipment:`, {
      equipmentId: equipment._id,
      equipmentName: equipment.equipmentName,
    });

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onAction("Delete")}
        title="Delete"
        aria-label="Delete equipment"
        className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-600"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

export default function EquipmentTable({ equipments }: EquipmentTableProps) {
  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<Record<string, EquipmentStatus>>(
    () =>
      Object.fromEntries(
        equipments
          .filter((item) => item.status)
          .map((item) => [item._id, item.status!])
      )
  );

  const filteredEquipments = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return equipments;

    return equipments.filter((item) =>
      [
        item.equipmentName,
        item.category,
        item.location,
        item.brand,
        item.model,
        item.creatorEmail,
        item.ownerInformation?.name,
        item.ownerInformation?.email,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(keyword))
    );
  }, [equipments, search]);

  const handleStatusChange = (
    equipment: Equipment,
    status: EquipmentStatus
  ) => {
    setStatuses((prev) => ({ ...prev, [equipment._id]: status }));
    console.log("Equipment status selected:", {
      equipmentId: equipment._id,
      equipmentName: equipment.equipmentName,
      selectedStatus: status,
    });
  };

  return (
    <section className="w-full min-w-0 space-y-4">
      {/* Search & Count */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full min-w-0 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equipment, owner, location..."
            className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <SlidersHorizontal className="size-4 shrink-0" />
          <span>
            Showing <strong className="text-foreground">{filteredEquipments.length}</strong> of{" "}
            {equipments.length} equipment
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-4 sm:px-5">
          <h2 className="font-semibold text-foreground">All Equipment</h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Review listings and manage equipment approval status.
          </p>
        </div>

        {/* Mobile and Tablet Cards */}
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4 xl:hidden">
          {filteredEquipments.map((equipment) => {
            const status = statuses[equipment._id] ?? equipment.status ?? "";
            const cardFields = [
              { label: "Owner", value: equipment.ownerInformation?.name || "—" },
              { label: "Category", value: equipment.category },
              {
                label: "Location",
                value: (
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{equipment.location}</span>
                  </span>
                ),
              },
              {
                label: "Available Quantity",
                value: `${equipment.availableQuantity} units`,
              },
              {
                label: "Registration Date",
                value: (
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5 text-muted-foreground" />
                    {formatDate(equipment.createdAt)}
                  </span>
                ),
              },
              {
                label: "Owner Email",
                value: <span className="truncate text-xs">{getOwnerEmail(equipment)}</span>,
              },
            ];

            return (
              <article
                key={equipment._id}
                className="min-w-0 space-y-4 rounded-xl border border-border bg-background p-3 sm:p-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <EquipmentImage equipment={equipment} />
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                      {equipment.equipmentName}
                    </h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {equipment.brand || equipment.category}
                      {equipment.model ? ` · ${equipment.model}` : ""}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {equipment.rentalPrice.toLocaleString()}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        / {equipment.rentalType}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-y border-border py-3">
                  {cardFields.map(({ label, value }) => (
                    <div key={label} className="min-w-0">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <div className="mt-1 truncate text-sm font-medium text-foreground">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Equipment Status
                  </p>
                  <StatusSelect
                    equipment={equipment}
                    status={status}
                    onChange={handleStatusChange}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
                  <span className="text-xs text-muted-foreground">Manage listing</span>
                  <EquipmentActions equipment={equipment} />
                </div>
              </article>
            );
          })}
        </div>

        {/* Desktop Table */}
        <div className="hidden w-full min-w-0 xl:block">
          <table className="w-full table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[25%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
            </colgroup>

            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs text-muted-foreground">
                {["Equipment", "Owner", "Price", "Status", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-3 py-4 font-medium first:pl-4 last:pr-4"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredEquipments.map((equipment) => {
                const status =
                  statuses[equipment._id] ?? equipment.status ?? "";

                return (
                  <tr
                    key={equipment._id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-3 py-3 pl-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <EquipmentImage equipment={equipment} />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {equipment.equipmentName}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {equipment.brand || equipment.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="min-w-0 px-3 py-3">
                      <p className="truncate font-medium text-foreground">
                        {equipment.ownerInformation?.name || "—"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {getOwnerEmail(equipment)}
                      </p>
                    </td>

                    <td className="px-3 py-3">
                      <p className="font-semibold text-foreground">
                        {equipment.rentalPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        / {equipment.rentalType}
                      </p>
                    </td>

                    <td className="px-3 py-3">
                      <StatusSelect
                        equipment={equipment}
                        status={status}
                        onChange={handleStatusChange}
                      />
                    </td>

                    <td className="px-3 py-3 pr-4">
                      <EquipmentActions equipment={equipment} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredEquipments.length === 0 && (
          <div className="px-4 py-14 text-center">
            <Package className="mx-auto size-9 text-muted-foreground" />
            <h3 className="mt-3 font-semibold text-foreground">
              No equipment found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search keyword.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border px-4 py-3 sm:px-5">
          <p className="text-xs text-muted-foreground">
            Displaying {filteredEquipments.length} of {equipments.length}{" "}
            equipment listings
          </p>
        </div>
      </div>
    </section>
  );
}