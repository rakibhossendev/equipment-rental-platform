
import { ArrowDownUp } from "lucide-react";

export default function EquipmentSort() {
    return (
        <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
                Explore available equipment
            </p>

            <div className="flex items-center gap-2">
                <ArrowDownUp className="size-4 text-muted-foreground" />

                <select
                    defaultValue="newest"
                    className="h-10 rounded-xl border border-border/70 bg-card/70 px-3 text-sm font-medium text-foreground outline-none backdrop-blur-xl transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                >
                    <option value="newest">Recently Added</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
}
