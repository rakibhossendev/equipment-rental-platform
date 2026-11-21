"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Heart,
    Package,
    Eye,
    Trash2,
    LoaderCircle,
    Search,
    LayoutGrid,
    Star,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { removeFavorite } from "@/lib/action/favorite/remove-favorite";
import { FavoriteEquipment } from "../../../../../typescript/main";

interface FavoritesTableProps {
    favorites: FavoriteEquipment[];
}

// equipmentImage can be a string or a string[]: use the first one
function getImage(image: FavoriteEquipment["equipmentImage"]): string | null {
    const first = Array.isArray(image) ? image[ 0 ] : image;

    if (typeof first !== "string") return null;

    const url = first.trim();

    return url.length > 0 ? url : null;
}

function Thumb({
    src,
    alt,
    className,
}: {
    src: string | null;
    alt: string;
    className: string;
}) {
    return (
        <div
            className={`relative shrink-0 overflow-hidden rounded-lg border border-border bg-muted ${className}`}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                />
            ) : (
                <Package className="absolute inset-0 m-auto size-6 text-muted-foreground" />
            )}
        </div>
    );
}

export default function FavoritesTable({
    favorites: initialFavorites,
}: FavoritesTableProps) {
    const [ favorites, setFavorites ] = useState(initialFavorites);
    const [ removingId, setRemovingId ] = useState<string | null>(null);
    const [ search, setSearch ] = useState("");

    const handleRemoveFavorite = async (favoriteId: string) => {
        if (removingId) return;

        setRemovingId(favoriteId);

        try {
            await removeFavorite(favoriteId);

            setFavorites((previous) =>
                previous.filter((item) => item._id !== favoriteId)
            );

            toast.success("Removed from favorites successfully!");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to remove favorite"
            );
        } finally {
            setRemovingId(null);
        }
    };

    // Summary numbers
    const { categoryCount, topCategory } = useMemo(() => {
        const counts = new Map<string, number>();

        favorites.forEach((item) => {
            const key = item.category || "Uncategorized";
            counts.set(key, (counts.get(key) ?? 0) + 1);
        });

        let top = "None";
        let topValue = 0;

        counts.forEach((value, key) => {
            if (value > topValue) {
                top = key;
                topValue = value;
            }
        });

        return { categoryCount: counts.size, topCategory: top };
    }, [ favorites ]);

    // Search by name or category
    const filteredFavorites = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) return favorites;

        return favorites.filter(
            (item) =>
                item.equipmentName?.toLowerCase().includes(value) ||
                item.category?.toLowerCase().includes(value)
        );
    }, [ favorites, search ]);

    const stats = [
        {
            label: "Saved Equipment",
            value: favorites.length,
            hint: "Items in your favorites",
            icon: Heart,
            iconClass:
                "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
        },
        {
            label: "Categories",
            value: categoryCount,
            hint: "Different categories saved",
            icon: LayoutGrid,
            iconClass: "bg-primary/10 text-primary",
        },
        {
            label: "Top Category",
            value: topCategory,
            hint: "Most saved category",
            icon: Star,
            iconClass:
                "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
        },
    ];

    return (
        <div className="min-w-0 space-y-6">

            {/* Header */}
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="size-4 text-rose-500" />
                    Customer Dashboard
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    My Favorites
                </h1>

                <p className="text-sm text-muted-foreground">
                    All your saved equipment in one place.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card
                        key={stat.label}
                        className={`flex flex-row items-start justify-between gap-3 p-4 shadow-sm sm:p-5 ${index === 0 ? "sm:col-span-2 xl:col-span-1" : ""
                            }`}
                    >
                        <div className="min-w-0 space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </p>
                            <p className="truncate text-2xl font-bold capitalize tracking-tight tabular-nums sm:text-3xl">
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {stat.hint}
                            </p>
                        </div>

                        <div
                            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
                        >
                            <stat.icon className="size-5" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty state */}
            {favorites.length === 0 ? (
                <Card className="flex flex-col items-center justify-center border-dashed px-4 py-16 text-center shadow-none">
                    <div className="mb-4 rounded-full bg-muted p-4">
                        <Heart className="size-8 text-muted-foreground" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        No favorite equipment yet
                    </h2>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                        Save equipment you like, and it will appear here.
                    </p>

                    <Link
                        href="/equipments"
                        className={buttonVariants({ className: "mt-6" })}
                    >
                        Browse Equipment
                    </Link>
                </Card>
            ) : (
                <Card className="min-w-0 overflow-hidden shadow-sm">

                    {/* Card header + search */}
                    <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                        <div>
                            <h2 className="font-semibold">Saved Equipment</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Manage your favorite equipment.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Search by name or category..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                className="h-10 bg-background pl-9"
                            />
                        </div>
                    </div>

                    {filteredFavorites.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 px-4 py-14 text-center text-muted-foreground">
                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                <Search className="size-6" />
                            </div>
                            <p className="text-sm font-medium">
                                No matching equipment found.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile: cards */}
                            <ul className="divide-y divide-border md:hidden">
                                {filteredFavorites.map((favorite) => (
                                    <li key={favorite._id} className="space-y-4 p-4">
                                        <div className="flex items-center gap-3">
                                            <Thumb
                                                src={getImage(favorite.equipmentImage)}
                                                alt={favorite.equipmentName}
                                                className="size-20"
                                            />

                                            <div className="min-w-0 space-y-2">
                                                <p className="break-words font-semibold leading-tight">
                                                    {favorite.equipmentName}
                                                </p>
                                                <Badge variant="secondary">
                                                    {favorite.category}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/equipments/${favorite.equipmentId}`}
                                                className={buttonVariants({
                                                    variant: "outline",
                                                    className: "flex-1",
                                                })}
                                            >
                                                <Eye className="size-4" />
                                                View Details
                                            </Link>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                disabled={removingId !== null}
                                                onClick={() =>
                                                    handleRemoveFavorite(favorite._id)
                                                }
                                                title="Remove favorite"
                                                aria-label="Remove favorite"
                                                className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                {removingId === favorite._id ? (
                                                    <LoaderCircle className="size-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="size-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Desktop: table */}
                            <div className="hidden w-full overflow-x-auto md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                                            <TableHead className="h-11 min-w-[280px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Equipment
                                            </TableHead>
                                            <TableHead className="h-11 min-w-[150px] px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Category
                                            </TableHead>
                                            <TableHead className="h-11 min-w-[200px] px-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {filteredFavorites.map((favorite) => (
                                            <TableRow
                                                key={favorite._id}
                                                className="transition-colors hover:bg-muted/40"
                                            >
                                                <TableCell className="px-4 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <Thumb
                                                            src={getImage(
                                                                favorite.equipmentImage
                                                            )}
                                                            alt={favorite.equipmentName}
                                                            className="size-14"
                                                        />

                                                        <span className="font-medium">
                                                            {favorite.equipmentName}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="px-4 py-3.5">
                                                    <Badge variant="secondary">
                                                        {favorite.category}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="px-4 py-3.5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/equipments/${favorite.equipmentId}`}
                                                            className={buttonVariants({
                                                                variant: "outline",
                                                                size: "sm",
                                                            })}
                                                        >
                                                            <Eye className="size-4" />
                                                            View Details
                                                        </Link>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            disabled={removingId !== null}
                                                            onClick={() =>
                                                                handleRemoveFavorite(
                                                                    favorite._id
                                                                )
                                                            }
                                                            title="Remove favorite"
                                                            aria-label="Remove favorite"
                                                            className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            {removingId === favorite._id ? (
                                                                <LoaderCircle className="size-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="size-4" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    )}

                    {/* Footer */}
                    <div className="border-t border-border bg-muted/30 px-4 py-3 sm:px-5">
                        <p className="text-xs text-muted-foreground">
                            Showing{" "}
                            <span className="font-semibold text-foreground">
                                {filteredFavorites.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-foreground">
                                {favorites.length}
                            </span>{" "}
                            saved equipment
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}