
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  CheckCircle2,
  Clock3,
  CreditCard,
} from "lucide-react";
import { RentalBooking } from "../../../../../typescript/main";
import RentalsSearch from "./MyRentalsSearch";
import RentalsTable from "./MyRentalTable";

interface MyRentalsContentProps {
  rentals: RentalBooking[];
}

export default function MyRentalsContent({
  rentals,
}: MyRentalsContentProps) {
  const [search, setSearch] = useState("");

  const filteredRentals = useMemo(() => {
    return rentals.filter((rental) =>
      rental.equipmentName.toLowerCase().includes(search.toLowerCase())
    );
  }, [rentals, search]);

  const totalRentals = rentals.length;

  const confirmedRentals = rentals.filter(
    (rental) => rental.bookingStatus.toLowerCase() === "confirmed"
  ).length;

  const pendingRentals = rentals.filter(
    (rental) => rental.bookingStatus.toLowerCase() === "pending"
  ).length;

  const paidRentals = rentals.filter(
    (rental) => rental.paymentStatus.toLowerCase() === "paid"
  ).length;

  const stats = [
    {
      title: "Total Rentals",
      value: totalRentals,
      icon: Package,
    },
    {
      title: "Confirmed",
      value: confirmedRentals,
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: pendingRentals,
      icon: Clock3,
    },
    {
      title: "Paid Bookings",
      value: paidRentals,
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="size-4" />
          Customer Dashboard
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Rentals
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your equipment bookings, rental dates and payment status.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="shadow-sm">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {stat.title}
                  </p>

                  <p className="text-2xl font-bold tabular-nums">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-secondary p-2.5">
                  <Icon className="size-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Your Bookings</h2>
          <p className="text-sm text-muted-foreground">
            Search and manage your rental history.
          </p>
        </div>

        <RentalsSearch search={search} onSearchChange={setSearch} />
      </div>

      {/* Rental Table */}
      <RentalsTable rentals={filteredRentals} />
    </div>
  );
}
