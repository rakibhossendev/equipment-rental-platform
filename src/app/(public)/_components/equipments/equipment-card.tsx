
import Image from "next/image";
import Link from "next/link";

import {
    MapPin,
    CalendarDays,
    ArrowUpRight,
    CheckCircle2,
    XCircle,
    ImageIcon,
} from "lucide-react";
import { Equipment } from "../../../../../typescript/main";



type EquipmentCardProps = {
    equipment: Equipment;
    /** Optional override for the View Details link.
     *  Defaults to the equipment details page (existing behavior). */
    detailsHref?: string;
};

export default function EquipmentCard({
    equipment,
    detailsHref,
}: EquipmentCardProps) {
    const isAvailable = equipment.availableQuantity > 0;

    const detailsLink = detailsHref ?? `/equipments/${equipment._id}`;

    // Get the first available image
    const imageSrc = Array.isArray(equipment.equipmentImage)
        ? equipment.equipmentImage[0]
        : equipment.equipmentImage;

    const hasImage = Boolean(imageSrc?.trim());

    return (
        <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-sm backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

            {/* Image */}
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-muted">

                {hasImage ? (
                    <Image
                        src={imageSrc}
                        alt={equipment.equipmentName}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ImageIcon className="size-10" />
                        <span className="text-xs">No image available</span>
                    </div>
                )}

                {/* Availability */}
                <div className="absolute right-3 top-3">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-xl ${
                            isAvailable
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                                : "border-destructive/20 bg-destructive/10 text-destructive"
                        }`}
                    >
                        {isAvailable ? (
                            <CheckCircle2 className="size-3.5" />
                        ) : (
                            <XCircle className="size-3.5" />
                        )}

                        {isAvailable ? "Available" : "Unavailable"}
                    </span>
                </div>

                {/* Category */}
                <div className="absolute bottom-3 left-3">
                    <span className="rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">
                        {equipment.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-4 sm:p-5">

                <div className="space-y-2">
                    <h3 className="line-clamp-1 text-lg font-bold text-foreground transition group-hover:text-primary">
                        {equipment.equipmentName}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0" />

                        <span className="truncate">
                            {equipment.location}
                        </span>
                    </div>
                </div>

                {/* Rental Information */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/50 p-3">
                    <div>
                        <p className="text-xs text-muted-foreground">
                            Rental Price
                        </p>

                        <p className="mt-1 text-lg font-bold text-foreground">
                            ৳{equipment.rentalPrice.toLocaleString("en-BD")}

                            <span className="ml-1 text-xs font-medium text-muted-foreground">
                                / {equipment.rentalType}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <CalendarDays className="size-4 text-muted-foreground" />

                        <span className="text-xs text-muted-foreground">
                            {equipment.availableQuantity} left
                        </span>
                    </div>
                </div>

                {/* Details Button */}
                <Link
                    href={detailsLink}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                    View Details

                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </div>
        </article>
    );
}
