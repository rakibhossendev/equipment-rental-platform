"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Eye,
    Package,
    ImageOff,
} from "lucide-react";

import type { Equipment } from "../../../../../typescript/main";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteOwnerEquipmentDialog from "./DeleteOwnerEquipmentDialog";
import { useRouter } from "next/navigation";
import EditMyEquipmentDialog from "./EditEquipmentModal";

interface MyEquipmentsTableProps {
    equipments: Equipment[];
}

// equipmentImage can be a string or an array of strings: use the first valid one
function getEquipmentImage(image: Equipment[ "equipmentImage" ]): string | null {
    const first = Array.isArray(image) ? image[ 0 ] : image;

    if (typeof first !== "string") {
        return null;
    }

    const url = first.trim();

    return url.length > 0 ? url : null;
}

// Thumbnail with a fallback when there is no image or it fails to load
function EquipmentThumb({
    src,
    alt,
}: {
    src: string | null;
    alt: string;
}) {
    const [ failed, setFailed ] = useState(false);

    if (!src || failed) {
        return (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                <ImageOff className="size-5" />
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="size-12 shrink-0 rounded-lg border border-border bg-muted object-cover"
        />
    );
}

export default function MyEquipmentsTable({
    equipments,
}: MyEquipmentsTableProps) {
    const router = useRouter();
    const [ search, setSearch ] = useState("");

    // Search equipment by name or category
    const filteredEquipments = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        if (!searchValue) {
            return equipments;
        }

        return equipments.filter((equipment) =>
            equipment.equipmentName.toLowerCase().includes(searchValue) ||
            equipment.category.toLowerCase().includes(searchValue)
        );
    }, [ equipments, search ]);

    // Status badge
    function getStatusBadge(status?: string) {
        switch (status?.toLowerCase()) {
            case "approved":
                return (
                    <Badge
                        variant="outline"
                        className="gap-1.5 border-green-200 bg-green-50 font-medium text-green-700 hover:bg-green-50 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
                    >
                        <span className="size-1.5 rounded-full bg-green-500" />
                        Approved
                    </Badge>
                );

            case "rejected":
                return (
                    <Badge
                        variant="outline"
                        className="gap-1.5 border-red-200 bg-red-50 font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
                    >
                        <span className="size-1.5 rounded-full bg-red-500" />
                        Rejected
                    </Badge>
                );

            case "pending":
            default:
                return (
                    <Badge
                        variant="outline"
                        className="gap-1.5 border-amber-200 bg-amber-50 font-medium text-amber-700 hover:bg-amber-50 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400"
                    >
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        Pending
                    </Badge>
                );
        }
    }

    return (
        <div className="space-y-4">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search by equipment name or category..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="h-10 bg-background pl-9 shadow-sm"
                    />
                </div>

                <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                        {filteredEquipments.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                        {equipments.length}
                    </span>{" "}
                    equipments
                </p>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Equipment Name
                                </TableHead>
                                <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Category
                                </TableHead>
                                <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Rental Price
                                </TableHead>
                                <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Available Quantity
                                </TableHead>
                                <TableHead className="h-11 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Status
                                </TableHead>
                                <TableHead className="h-11 px-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredEquipments.length > 0 ? (
                                filteredEquipments.map((equipment) => (
                                    <TableRow
                                        key={equipment._id}
                                        className="transition-colors hover:bg-muted/40"
                                    >
                                        <TableCell className="px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <EquipmentThumb
                                                    src={getEquipmentImage(equipment.equipmentImage)}
                                                    alt={equipment.equipmentName}
                                                />
                                                <span className="font-medium text-foreground">
                                                    {equipment.equipmentName}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-4 py-3.5">
                                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                                {equipment.category}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3.5">
                                            <span className="font-semibold text-foreground">
                                                ৳{equipment.rentalPrice}
                                            </span>
                                            <span className="ml-1 text-xs text-muted-foreground">
                                                / {equipment.rentalType}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3.5">
                                            <span
                                                className={
                                                    Number(equipment.availableQuantity) === 0
                                                        ? "font-medium text-destructive"
                                                        : "font-medium text-foreground"
                                                }
                                            >
                                                {equipment.availableQuantity}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3.5">
                                            {getStatusBadge(equipment.status)}
                                        </TableCell>

                                        <TableCell className="px-4 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                {/* View Details */}
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    title="View Details"
                                                    className="size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                                >
                                                    <Link href={`/dashboard/my-equipments/${equipment._id}`}>
                                                        <Eye className="size-4" />
                                                    </Link>
                                                </Button>

                                                {/* Update */}
                                                <EditMyEquipmentDialog
                                                    equipment={equipment}
                                                    onUpdated={() => router.refresh()}
                                                />

                                                {/* Delete */}
                                                <DeleteOwnerEquipmentDialog
                                                    equipmentId={equipment._id}
                                                    onDeleted={() => {
                                                        // Refresh equipment list
                                                        router.refresh();
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={6} className="h-48 text-center">
                                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                                <Package className="size-6" />
                                            </div>
                                            <p className="text-sm font-medium">
                                                {search
                                                    ? "No matching equipment found."
                                                    : "You haven't added any equipment yet."}
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}