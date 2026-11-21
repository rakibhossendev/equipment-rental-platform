import { getFavorites } from "@/lib/action/favorite/favorites";
import FavoritesTable from "../../_components/favorites/FavoriteTable";
import { FavoriteEquipment } from "../../../../../typescript/main";

export default async function Favorites() {
  let favorites: FavoriteEquipment[] = [];
  let hasError = false;

  try {
    favorites = await getFavorites();
  } catch (error) {
    console.error("Favorites fetch error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card px-4 text-center">
          <h2 className="text-xl font-semibold">Unable to load favorites</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Something went wrong while fetching your favorite equipment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl p-4 sm:p-6 lg:p-8">
      <FavoritesTable favorites={favorites} />
    </section>
  );
}