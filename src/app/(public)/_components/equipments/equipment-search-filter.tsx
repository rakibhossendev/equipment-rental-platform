
import {
    Search,
    SlidersHorizontal,
    MapPin,
    Tag,
    CalendarDays,
    Wallet,
} from "lucide-react";

export default function EquipmentSearchFilter() {
    return (
        <div className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur-2xl sm:p-5">
            <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

                    <input
                        type="text"
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
                            defaultValue=""
                            className="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="" disabled>
                                Equipment Category
                            </option>
                        </select>
                    </div>

                    {/* Rental Type */}
                    <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            defaultValue=""
                            className="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="" disabled>
                                Rental Type
                            </option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                            type="number"
                            placeholder="Min - Max Price"
                            className="h-11 w-full rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        />
                    </div>

                    {/* Availability */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            defaultValue=""
                            className="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background/60 pl-10 pr-3 text-sm text-muted-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="" disabled>
                                Availability
                            </option>
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
