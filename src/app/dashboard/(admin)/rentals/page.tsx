import { getAllRentals } from "@/lib/action/rentals/get-admin-rentals";
import { AdminRental } from "../../../../../typescript/main";
import AllRentalsTable from "../../_components/rentals/AdminRentalTable";

export default async function AllRentalPage() {
  let rentals: AdminRental[] = [];
  let hasError = false;

  try {
    rentals = await getAllRentals();
  } catch (error) {
    console.error("All rentals page error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-7xl space-y-4 p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            All Rentals
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor and manage all rental activities.
          </p>
        </div>

        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="font-medium">Failed to load rental records.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please refresh the page and try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6 lg:p-8">
      <AllRentalsTable rentals={rentals} />
    </div>
  );
}