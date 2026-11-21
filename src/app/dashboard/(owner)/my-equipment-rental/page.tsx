
import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";
import Link from "next/link";
import {
  CalendarDays,
  Package,
  Receipt,
  Users,
} from "lucide-react";

type Rental = {
  _id: string;
  customerInformation: {
    name: string;
    email: string;
    phone: string;
  };
  equipmentInformation: {
    equipmentName: string;
    brand: string;
    model: string;
    equipmentImage?: string | string[];
  };
  rentalDuration: {
    startDate: string;
    endDate: string;
    duration: number | string;
    rentalType: string;
  };
  quantity: number;
  bookingAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
};

function getStatusStyle(status: string) {
  switch (status) {
    case "Paid":
    case "Confirmed":
    case "Completed":
      return "bg-green-500/10 text-green-600";

    case "Pending":
      return "bg-yellow-500/10 text-yellow-600";

    case "Failed":
    case "Cancelled":
      return "bg-red-500/10 text-red-600";

    default:
      return "bg-secondary text-muted-foreground";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function MyEquipmentRentalPage() {
  const token = await getJWTTokenServer();

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/owner-rentals`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    return (
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <Package className="mb-4 size-12 text-muted-foreground" />

        <h2 className="text-xl font-semibold">
          Unable to Load Rentals
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {result.message || "Something went wrong. Please try again."}
        </p>

        <Link
          href="/dashboard/owner"
          className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to Dashboard
        </Link>
      </section>
    );
  }

  const rentals: Rental[] = result.data || [];

  return (
    <section className="w-full space-y-6 px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          My Equipment Rental
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          View all rental bookings for your equipment.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Rentals
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {rentals.length}
              </h2>
            </div>

            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Receipt className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Confirmed Rentals
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {rentals.filter(
                  (rental) => rental.bookingStatus === "Confirmed"
                ).length}
              </h2>
            </div>

            <div className="rounded-lg bg-green-500/10 p-3 text-green-600">
              <Package className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Customers
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {new Set(
                  rentals.map((rental) => rental.customerInformation.email)
                ).size}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-600">
              <Users className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Rental Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold">Rental Bookings</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {rentals.length} booking(s) found
          </p>
        </div>

        {rentals.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <CalendarDays className="size-8 text-muted-foreground" />
            </div>

            <h3 className="font-semibold">No Rental Bookings Yet</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
             {`You don't have any rental bookings for your equipment yet.`}
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Customer Information
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Equipment Information
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Rental Duration
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Required Quantity
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Booking Amount
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Payment Status
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Booking Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {rentals.map((rental) => (
                  <tr
                    key={rental._id}
                    className="transition hover:bg-secondary/30"
                  >
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <p className="font-medium">
                        {rental.customerInformation.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {rental.customerInformation.email}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {rental.customerInformation.phone}
                      </p>
                    </td>

                    {/* Equipment */}
                    <td className="px-5 py-4">
                      <p className="font-medium">
                        {rental.equipmentInformation.equipmentName}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {rental.equipmentInformation.brand}{" "}
                        {rental.equipmentInformation.model}
                      </p>
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap">
                        {formatDate(rental.rentalDuration.startDate)}
                      </p>
                      <p className="my-1 text-xs text-muted-foreground">
                        to
                      </p>
                      <p className="whitespace-nowrap">
                        {formatDate(rental.rentalDuration.endDate)}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {rental.rentalDuration.duration}{" "}
                        {rental.rentalDuration.rentalType}
                      </p>
                    </td>

                    {/* Quantity */}
                    <td className="px-5 py-4 font-medium">
                      {rental.quantity} Units
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 font-semibold">
                      ৳{rental.bookingAmount}
                    </td>

                    {/* Payment Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          rental.paymentStatus
                        )}`}
                      >
                        {rental.paymentStatus}
                      </span>
                    </td>

                    {/* Booking Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          rental.bookingStatus
                        )}`}
                      >
                        {rental.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
