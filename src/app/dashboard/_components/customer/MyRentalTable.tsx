"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RentalBooking } from "../../../../../typescript/main";
import { Package, CalendarDays, ArrowRight } from "lucide-react";

interface RentalsTableProps {
  rentals: RentalBooking[];
}

function formatDate(date?: string) {
  if (!date) return "N/A";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "N/A";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount?: number) {
  const value = Number(amount);

  return Number.isFinite(value) ? value.toLocaleString("en-BD") : "N/A";
}

type StatusTone = {
  badge: string;
  dot: string;
};

// Real colors for each status (light + dark mode)
const tones: Record<string, StatusTone> = {
  green: {
    badge:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
    dot: "bg-green-500",
  },
  amber: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  red: {
    badge:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
    dot: "bg-red-500",
  },
  blue: {
    badge:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  slate: {
    badge:
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
    dot: "bg-slate-400",
  },
};

function getTone(status?: string): StatusTone {
  switch (status?.toLowerCase()) {
    case "paid":
    case "confirmed":
    case "completed":
    case "success":
    case "succeeded":
      return tones.green;

    case "pending":
    case "processing":
    case "unpaid":
      return tones.amber;

    case "failed":
    case "cancelled":
    case "canceled":
    case "rejected":
      return tones.red;

    case "active":
    case "ongoing":
    case "refunded":
      return tones.blue;

    default:
      return tones.slate;
  }
}

function StatusBadge({ status }: { status?: string }) {
  const tone = getTone(status);

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 whitespace-nowrap font-medium capitalize ${tone.badge}`}
    >
      <span className={`size-1.5 rounded-full ${tone.dot}`} />
      {status || "Unknown"}
    </Badge>
  );
}

export default function RentalsTable({ rentals }: RentalsTableProps) {
  if (!rentals.length) {
    return (
      <Card className="border-dashed shadow-none">
        <CardContent className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-4 rounded-full bg-secondary p-4">
            <Package className="size-8 text-muted-foreground" />
          </div>

          <h3 className="text-lg font-semibold">No rentals found</h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Your equipment rental bookings will appear here once you make
            your first booking.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0 overflow-hidden border-border shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-border p-4 sm:p-5">
        <h2 className="font-semibold">Rental History</h2>
        <p className="text-sm text-muted-foreground">
          A complete overview of your equipment bookings.
        </p>
      </div>

      {/* Mobile: cards */}
      <ul className="divide-y divide-border md:hidden">
        {rentals.map((rental) => (
          <li key={rental._id} className="space-y-4 p-4">
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
                    Booked on {formatDate(rental.createdAt)}
                  </p>
                </div>
              </div>

              <p className="shrink-0 text-base font-bold tabular-nums">
                ৳{formatAmount(rental.totalPay)}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
              <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
              <span className="font-medium">{formatDate(rental.startDate)}</span>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="font-medium">{formatDate(rental.endDate)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Payment</span>
                <StatusBadge status={rental.paymentStatus} />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Booking</span>
                <StatusBadge status={rental.bookingStatus} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden w-full overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="h-11 min-w-[200px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Equipment
              </TableHead>
              <TableHead className="h-11 min-w-[120px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Start Date
              </TableHead>
              <TableHead className="h-11 min-w-[120px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                End Date
              </TableHead>
              <TableHead className="hidden h-11 min-w-[120px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground xl:table-cell">
                Booking Date
              </TableHead>
              <TableHead className="h-11 min-w-[120px] px-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Total Amount
              </TableHead>
              <TableHead className="h-11 min-w-[120px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Payment
              </TableHead>
              <TableHead className="h-11 min-w-[120px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Booking
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rentals.map((rental) => (
              <TableRow
                key={rental._id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Package className="size-4" />
                    </div>
                    <span className="font-medium">{rental.equipmentName}</span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3.5 text-sm">
                  {formatDate(rental.startDate)}
                </TableCell>

                <TableCell className="px-4 py-3.5 text-sm">
                  {formatDate(rental.endDate)}
                </TableCell>

                <TableCell className="hidden px-4 py-3.5 text-sm text-muted-foreground xl:table-cell">
                  {formatDate(rental.createdAt)}
                </TableCell>

                <TableCell className="px-4 py-3.5 text-right font-semibold tabular-nums">
                  ৳{formatAmount(rental.totalPay)}
                </TableCell>

                <TableCell className="px-4 py-3.5">
                  <StatusBadge status={rental.paymentStatus} />
                </TableCell>

                <TableCell className="px-4 py-3.5">
                  <StatusBadge status={rental.bookingStatus} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-muted/30 px-4 py-3 sm:px-5">
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{rentals.length}</span>{" "}
          rental booking{rentals.length !== 1 && "s"}
        </p>
      </div>
    </Card>
  );
}