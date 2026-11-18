
"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
    Search,
    SlidersHorizontal,
    Tag,
    CalendarDays,
    Wallet,
    MapPin,
} from "lucide-react";

import { EquipmentCategory } from "../../../../../typescript/main";

const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
    "Construction",
    "Electronics",
    "Photography",
    "Vehicles",
    "Agriculture",
    "Event",
    "Tools",
    "Other",
];

export default function EquipmentSearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur-2xl sm:p-5">
            <div className="flex flex-col gap-4">

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                    <input
                        type="text"
                        defaultValue={searchParams.get("search") || ""}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        placeholder="Search equipment by name or location..."
                        className="h-12 w-full rounded-xl border border-border/70 bg-background/60 pl-12 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                        Filters
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Category */}
                    <div className="relative">
                        <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            value={searchParams.get("category") || ""}
                            onChange={(e) => updateFilter("category", e.target.value)}
                            className="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary/50"
                        >
                            <option value="">All Categories</option>

                            {EQUIPMENT_CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rental Type */}
                    <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            value={searchParams.get("rentalType") || ""}
                            onChange={(e) => updateFilter("rentalType", e.target.value)}
                            className="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary/50"
                        >
                            <option value="">All Rental Types</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>

                    {/* Minimum Price */}
                    <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                            type="number"
                            min="0"
                            placeholder="Minimum Price"
                            defaultValue={searchParams.get("minPrice") || ""}
                            onBlur={(e) => updateFilter("minPrice", e.target.value)}
                            className="h-11 w-full rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50"
                        />
                    </div>

                    {/* Maximum Price */}
                    <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                            type="number"
                            min="0"
                            placeholder="Maximum Price"
                            defaultValue={searchParams.get("maxPrice") || ""}
                            onBlur={(e) => updateFilter("maxPrice", e.target.value)}
                            className="h-11 w-full rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50"
                        />
                    </div>

                    {/* Availability */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            value={searchParams.get("availability") || ""}
                            onChange={(e) => updateFilter("availability", e.target.value)}
                            className="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary/50"
                        >
                            <option value="">All Availability</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}
