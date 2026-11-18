import { getAllEquipment } from "@/lib/action/equipment/getEquipment";
import { HardHat } from "lucide-react";
import EquipmentSearchFilter from "../_components/equipments/equipment-search-filter";
import EquipmentSort from "../_components/equipments/equipment-sort";
import EquipmentCard, { Equipment } from "../_components/equipments/equipment-card";

export default async function EquipmentPage({ searchParams }: { searchParams: Promise<{ [ key: string ]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([ key, value ]) => {
        if (typeof value === "string" && value !== "") {
            queryParams.set(key, value);
        }
    });
    const response = await getAllEquipment(
        queryParams.toString()
    );
    const equipments: Equipment[] = response.data;

    return (
        <main className="min-h-screen bg-background">
            <section className="container-page space-y-8 py-10 sm:py-14">

                {/* Page Heading */}
                <div className="space-y-3 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <HardHat className="size-7" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Explore Equipment
                    </h1>

                    <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Find the right equipment for your next project.
                        Browse, compare, and rent with confidence.
                    </p>
                </div>

                {/* Search and Filters */}
                <EquipmentSearchFilter/>

                {/* Sorting */}
                <EquipmentSort />

                {/* Equipment Grid */}
                {equipments.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {equipments.map((equipment) => (
                            <EquipmentCard
                                key={equipment._id}
                                equipment={equipment}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-5 text-center">
                        <HardHat className="mb-4 size-10 text-muted-foreground/50" />

                        <h2 className="text-lg font-semibold text-foreground">
                            No Equipment Found
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            There are currently no approved equipment listings.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
