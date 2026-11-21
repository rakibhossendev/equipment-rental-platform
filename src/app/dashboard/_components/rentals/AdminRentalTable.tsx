"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  CalendarDays,
  Package,
  Wallet,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { AdminRental } from "../../../../../typescript/main";

type Props = {
  rentals: AdminRental[];
};

type Person = {
  name?: string;
  email?: string;
  phone?: string;
};

// Status colors (light + dark), case-insensitive, works for payment and booking
const tones = {
  green:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
  amber:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
  red: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
  blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
  slate:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
};

const dots = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  slate: "bg-slate-400",
};

function getTone(status?: string): keyof typeof tones {
  switch (status?.toLowerCase()) {
    case "paid":
    case "confirmed":
    case "success":
      return "green";
    case "pending":
    case "processing":
      return "amber";
    case "failed":
    case "cancelled":
    case "canceled":
      return "red";
    case "completed":
    case "refunded":
      return "blue";
    default:
      return "slate";
  }
}

function StatusBadge({ status }: { status?: string }) {
  const tone = getTone(status);

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 whitespace-nowrap font-medium ${tones[tone]}`}
    >
      <span className={`size-1.5 rounded-full ${dots[tone]}`} />
      {status || "Unknown"}
    </Badge>
  );
}

const formatDate = (date?: string) => {
  if (!date) return "N/A";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatAmount = (amount?: number) => {
  const value = Number(amount);

  return Number.isFinite(value) ? value.toLocaleString("en-BD") : "N/A";
};

const getInitials = (name?: string) => {
  if (!name) return "?";

  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
};

// Avatar + name + email + phone
function PersonInfo({ person, tint }: { person?: Person; tint: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tint}`}
      >
        {getInitials(person?.name)}
      </div>

      <div className="min-w-0 space-y-0.5">
        <p className="truncate text-sm font-medium">
          {person?.name || "Unknown"}
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mail className="size-3 shrink-0" />
          <span className="truncate">{person?.email || "N/A"}</span>
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="size-3 shrink-0" />
          <span className="truncate">{person?.phone || "N/A"}</span>
        </p>
      </div>
    </div>
  );
}

const customerTint =
  "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
const ownerTint =
  "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400";

export default function AllRentalsTable({ rentals }: Props) {
  const [search, setSearch] = useState("");

  const filteredRentals = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) return rentals;

    return rentals.filter((rental) => {
      return [
        rental.equipmentName,
        rental.customerInformation?.name,
        rental.customerInformation?.email,
        rental.ownerInformation?.name,
        rental.ownerInformation?.email,
        rental.paymentStatus,
        rental.bookingStatus,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchValue));
    });
  }, [rentals, search]);

  const paidRentals = rentals.filter(
    (rental) => rental.paymentStatus === "Paid"
  ).length;

  const pendingRentals = rentals.filter(
    (rental) => rental.bookingStatus === "Pending"
  ).length;

  const totalAmount = rentals.reduce(
    (total, rental) =>
      total + (rental.paymentStatus === "Paid" ? rental.totalPay : 0),
    0
  );

  const stats = [
    {
      label: "Total Rentals",
      value: rentals.length.toString(),
      hint: "All bookings on the platform",
      icon: Package,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      label: "Paid Rentals",
      value: paidRentals.toString(),
      hint: "Payment completed",
      icon: CheckCircle2,
      iconClass:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    },
    {
      label: "Pending Bookings",
      value: pendingRentals.toString(),
      hint: "Waiting for confirmation",
      icon: Clock,
      iconClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      label: "Total Collected",
      value: `৳${formatAmount(totalAmount)}`,
      hint: "From paid rentals only",
      icon: Wallet,
      iconClass:
        "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
    },
  ];

  return (
    <section className="min-w-0 space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          All Rentals
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor and manage all rental activities.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="flex items-start justify-between gap-3 p-4 sm:p-5">
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="truncate text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.hint}</p>
              </div>

              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
              >
                <stat.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rentals */}
      <Card className="min-w-0 overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 className="font-semibold">Rental Records</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredRentals.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {rentals.length}
              </span>{" "}
              rentals
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search rentals..."
              className="h-10 bg-background pl-9"
            />
          </div>
        </div>

        {filteredRentals.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Package className="size-6" />
            </div>

            <div className="space-y-1">
              <p className="font-medium">
                {search ? "No matching rentals found" : "No rental records yet"}
              </p>
              <p className="text-sm text-muted-foreground">
                {search
                  ? "Try searching with another keyword."
                  : "Rental bookings will appear here."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile and tablet: cards */}
            <ul className="divide-y divide-border lg:hidden">
              {filteredRentals.map((rental) => (
                <li key={rental._id} className="space-y-4 p-4 sm:p-5">
                  {/* Equipment + amount */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Package className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="break-words font-semibold leading-tight">
                          {rental.equipmentName}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Qty: {rental.quantity} · {rental.rentalDuration}{" "}
                          {rental.rentalType}
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 text-base font-bold tabular-nums">
                      ৳{formatAmount(rental.totalPay)}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
                    <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium">
                      {formatDate(rental.startDate)}
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-medium">
                      {formatDate(rental.endDate)}
                    </span>
                  </div>

                  {/* People */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Customer
                      </p>
                      <PersonInfo
                        person={rental.customerInformation}
                        tint={customerTint}
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Owner
                      </p>
                      <PersonInfo
                        person={rental.ownerInformation}
                        tint={ownerTint}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Payment
                      </span>
                      <StatusBadge status={rental.paymentStatus} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Booking
                      </span>
                      <StatusBadge status={rental.bookingStatus} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop: table */}
            <div className="hidden w-full overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="h-11 min-w-[210px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Customer
                    </TableHead>
                    <TableHead className="h-11 min-w-[210px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Owner
                    </TableHead>
                    <TableHead className="h-11 min-w-[150px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Equipment
                    </TableHead>
                    <TableHead className="h-11 min-w-[170px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Rental Duration
                    </TableHead>
                    <TableHead className="h-11 px-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Payment
                    </TableHead>
                    <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Booking
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredRentals.map((rental) => (
                    <TableRow
                      key={rental._id}
                      className="transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="px-4 py-4 align-top">
                        <PersonInfo
                          person={rental.customerInformation}
                          tint={customerTint}
                        />
                      </TableCell>

                      <TableCell className="px-4 py-4 align-top">
                        <PersonInfo
                          person={rental.ownerInformation}
                          tint={ownerTint}
                        />
                      </TableCell>

                      <TableCell className="px-4 py-4 align-top">
                        <p className="font-medium">{rental.equipmentName}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Qty: {rental.quantity}
                        </p>
                      </TableCell>

                      <TableCell className="px-4 py-4 align-top">
                        <p className="font-medium">
                          {rental.rentalDuration} {rental.rentalType}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
                          {formatDate(rental.startDate)}
                          <ArrowRight className="size-3" />
                          {formatDate(rental.endDate)}
                        </p>
                      </TableCell>

                      <TableCell className="px-4 py-4 text-right align-top font-semibold tabular-nums">
                        ৳{formatAmount(rental.totalPay)}
                      </TableCell>

                      <TableCell className="px-4 py-4 align-top">
                        <StatusBadge status={rental.paymentStatus} />
                      </TableCell>

                      <TableCell className="px-4 py-4 align-top">
                        <StatusBadge status={rental.bookingStatus} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </Card>
    </section>
  );
}