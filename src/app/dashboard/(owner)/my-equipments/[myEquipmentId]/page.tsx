import { env } from "@/config/env-config";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    MapPin,
    Package,
    CalendarDays,
    UserRound,
    Phone,
    Mail,
    Layers,
    ShieldCheck,
    Clock,
} from "lucide-react";

type Props = {
    params: Promise<{
        myEquipmentId: string;
    }>;
    // Selected image is stored in the URL so this page can stay a server component
    searchParams: Promise<{
        image?: string;
    }>;
};

const statusStyles: Record<string, string> = {
    approved:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
    pending:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400",
    rejected:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
};

export default async function MyEquipmentDetails({
    params,
    searchParams,
}: Props) {
    const { myEquipmentId } = await params;
    const { image } = await searchParams;
    const token = await getJWTTokenServer();

    const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/equipments/my-equipment/${myEquipmentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        return (
            <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 rounded-full bg-destructive/10 p-4">
                    <Package className="size-8 text-destructive" />
                </div>

                <h2 className="text-xl font-semibold">Equipment Not Found</h2>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {result.message || "Unable to load equipment details."}
                </p>

                <Link
                    href="/dashboard/owner/my-equipments"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                    <ArrowLeft className="size-4" />
                    Back to My Equipments
                </Link>
            </section>
        );
    }

    const equipment = result.data;

    // Keep only valid image urls (empty strings crash next/image)
    const images: string[] = (
        Array.isArray(equipment.equipmentImage)
            ? equipment.equipmentImage
            : [ equipment.equipmentImage ]
    ).filter(
        (img: unknown): img is string =>
            typeof img === "string" && img.trim().length > 0
    );

    // Selected image index (safe against bad query values)
    const requestedIndex = Number.parseInt(image ?? "0", 10);
    const activeIndex =
        Number.isInteger(requestedIndex) &&
            requestedIndex >= 0 &&
            requestedIndex < images.length
            ? requestedIndex
            : 0;
    const activeImage = images[ activeIndex ];

    const statusClass =
        statusStyles[ String(equipment.status ?? "").toLowerCase() ] ||
        "border-border bg-secondary text-secondary-foreground";

    const price = Number(equipment.rentalPrice);
    const formattedPrice = Number.isFinite(price)
        ? price.toLocaleString("en-BD")
        : "N/A";

    const quickFacts = [
        {
            label: "Available",
            value: `${equipment.availableQuantity ?? 0} units`,
            icon: Layers,
        },
        {
            label: "Condition",
            value: equipment.equipmentCondition || "N/A",
            icon: ShieldCheck,
        },
        {
            label: "Rental type",
            value: equipment.rentalType || "N/A",
            icon: Clock,
        },
    ];

    const specifications = [
        { label: "Category", value: equipment.category },
        { label: "Brand", value: equipment.brand },
        { label: "Model", value: equipment.model },
        { label: "Condition", value: equipment.equipmentCondition },
        { label: "Rental type", value: equipment.rentalType },
        { label: "Available quantity", value: equipment.availableQuantity },
        { label: "Location", value: equipment.location },
    ];

    return (
        <section className="mx-auto w-full min-w-0 max-w-7xl space-y-8 px-4 py-6 md:px-6 lg:py-8">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                    href="/dashboard/owner/my-equipments"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                >
                    <ArrowLeft className="size-4" />
                    Back to My Equipments
                </Link>

                <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1 text-sm font-medium capitalize ${statusClass}`}
                >
                    <span className="size-1.5 rounded-full bg-current" />
                    {equipment.status || "Pending"}
                </span>
            </div>

            {/* Gallery + Summary */}
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                {/* Gallery */}
                <div className="min-w-0 space-y-4 lg:col-span-7">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-secondary sm:aspect-[16/11]">
                        {activeImage ? (
                            <>
                                <Image
                                    key={activeImage}
                                    src={activeImage}
                                    alt={equipment.equipmentName}
                                    fill
                                    priority
                                    unoptimized
                                    sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                                    className="object-cover"
                                />

                                {images.length > 1 && (
                                    <span className="absolute bottom-4 right-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                                        {activeIndex + 1} / {images.length}
                                    </span>
                                )}
                            </>
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                                <Package className="size-14" />
                                <p className="text-sm">No image available</p>
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                            {images.map((img, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <li key={`${img}-${index}`}>
                                        <Link
                                            href={`?image=${index}`}
                                            scroll={false}
                                            aria-label={`Show image ${index + 1}`}
                                            aria-current={isActive}
                                            className={`relative block aspect-square overflow-hidden rounded-xl border-2 bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive
                                                ? "border-primary"
                                                : "border-transparent opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${equipment.equipmentName} ${index + 1}`}
                                                fill
                                                unoptimized
                                                sizes="(min-width: 1024px) 10vw, 25vw"
                                                className="object-cover"
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Summary (sticky on desktop) */}
                <aside className="min-w-0 lg:sticky lg:top-6 lg:col-span-5">
                    <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
                        <p className="text-sm text-muted-foreground">
                            {[ equipment.category, equipment.brand ]
                                .filter(Boolean)
                                .join(" • ") || "Equipment"}
                        </p>

                        <h1 className="mt-2 break-words text-2xl font-bold tracking-tight md:text-3xl">
                            {equipment.equipmentName}
                        </h1>

                        {equipment.model && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Model: {equipment.model}
                            </p>
                        )}

                        <div className="mt-6 border-y border-border py-5">
                            <p className="text-sm text-muted-foreground">Rental price</p>
                            <p className="mt-1 text-4xl font-bold tracking-tight text-primary">
                                ৳{formattedPrice}
                                <span className="ml-1 text-base font-normal text-muted-foreground">
                                    / {equipment.rentalType}
                                </span>
                            </p>
                        </div>

                        <dl className="mt-5 grid grid-cols-3 gap-3">
                            {quickFacts.map(({ label, value, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="min-w-0 rounded-2xl bg-secondary/60 p-3"
                                >
                                    <Icon className="size-4 text-muted-foreground" />
                                    <dt className="mt-2 text-xs text-muted-foreground">
                                        {label}
                                    </dt>
                                    <dd className="mt-0.5 break-words text-sm font-semibold capitalize">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-5 flex items-start gap-3 text-sm">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <p className="break-words text-muted-foreground">
                                {equipment.location || "Location not provided"}
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Details */}
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                <div className="min-w-0 space-y-6 lg:col-span-8">
                    <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="mt-3 max-w-prose whitespace-pre-line break-words text-sm leading-7 text-muted-foreground">
                            {equipment.description || "No description provided."}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
                        <h2 className="text-lg font-semibold">Specifications</h2>

                        <dl className="mt-4 divide-y divide-border">
                            {specifications.map((item) => (
                                <div
                                    key={item.label}
                                    className="grid grid-cols-3 gap-4 py-3 text-sm"
                                >
                                    <dt className="text-muted-foreground">{item.label}</dt>
                                    <dd className="col-span-2 break-words font-medium capitalize">
                                        {item.value ?? "N/A"}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
                        <h2 className="text-lg font-semibold">
                            Rental terms &amp; conditions
                        </h2>
                        <p className="mt-3 max-w-prose whitespace-pre-line break-words text-sm leading-7 text-muted-foreground">
                            {equipment.rentalTermsAndConditions ||
                                "No rental terms and conditions provided."}
                        </p>
                    </div>
                </div>

                {/* Owner */}
                <div className="min-w-0 space-y-6 lg:sticky lg:top-6 lg:col-span-4">
                    <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <UserRound className="size-5" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="font-semibold">Owner</h2>
                                <p className="break-words text-sm text-muted-foreground">
                                    {equipment.ownerInformation?.name || "N/A"}
                                </p>
                            </div>
                        </div>

                        <ul className="mt-5 space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span className="min-w-0 break-all">
                                    {equipment.ownerInformation?.email || "N/A"}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span className="min-w-0 break-all">
                                    {equipment.ownerInformation?.phone || "N/A"}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                <span className="min-w-0 break-words">
                                    {equipment.ownerInformation?.address || "N/A"}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2 px-1 text-xs text-muted-foreground">
                        <p className="flex items-center gap-2">
                            <CalendarDays className="size-3.5" />
                            Created:{" "}
                            {equipment.createdAt
                                ? new Date(equipment.createdAt).toLocaleDateString()
                                : "N/A"}
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarDays className="size-3.5" />
                            Last updated:{" "}
                            {equipment.updatedAt
                                ? new Date(equipment.updatedAt).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}