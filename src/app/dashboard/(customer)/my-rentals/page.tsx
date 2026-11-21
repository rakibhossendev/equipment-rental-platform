import { myRentals } from "@/lib/action/rentals/myRental";
import MyRentalsContent from "../../_components/customer/MyRentalContent";

export default async function MyRentals() {
  let rentals;
  let hasError = false;

  try {
    rentals = await myRentals();
  } catch (error) {
    console.error("My rentals fetch error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card px-4 text-center">
          <h2 className="text-xl font-semibold">Unable to load rentals</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Something went wrong while fetching your rental history.
            Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6 lg:p-8">
      <MyRentalsContent rentals={rentals ?? []} />
    </section>
  );
}