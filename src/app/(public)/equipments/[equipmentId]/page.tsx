import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Package,
  CalendarDays,
  Tag,
  ShieldCheck,
  UserRound,
  Phone,
  Heart,
  CheckCircle2,
  ImageOff,
} from "lucide-react";

import { getEquipmentDetails } from "@/lib/action/equipment/getEquipment";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Equipment } from "../../../../../typescript/main";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { toast } from "sonner";
import BookingModal from "../../_components/equipments/BookingModal";
import AddFavoriteButton from "../../_components/equipments/AddFavoriteButton";


interface EquipmentDetailsPageProps { params: Promise<{ equipmentId: string; }>; }

// Status badge colors
function getStatusClass(status?: string) {
  switch (status?.toLowerCase()) {
    case "approved":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400";
    case "rejected":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400";
    default:
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400";
  }
}

export default async function EquipmentDetailsPage({ params, }: EquipmentDetailsPageProps) {
  const { equipmentId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/sign-up");
  }

  if (session.user.role !== "customer") {
    redirect("/unauthorized");
  }
  // Some APIs return { data: {...} }, others return the object directly
  const response: unknown = await getEquipmentDetails(equipmentId);
  const equipment = (
    response && typeof response === "object" && "data" in response
      ? (response as { data: Equipment }).data
      : response
  ) as Equipment | null;

  if (!equipment || !equipment.equipmentName) {
    notFound();
  }

  // Images (string or string[]): keep only valid urls
  const images = (Array.isArray(equipment.equipmentImage) ? equipment.equipmentImage : [ equipment.equipmentImage ]).filter((image): image is string => typeof image === "string" && image.trim().length > 0);

  const mainImage = images[ 0 ];
  const extraImages = images.slice(1, 5);

  // Safe numbers (never crash if a field is missing)
  const price = Number(equipment.rentalPrice);
  const formattedPrice = Number.isFinite(price)
    ? price.toLocaleString("en-BD")
    : "N/A";

  const quantity = Number(equipment.availableQuantity) || 0;
  const isAvailable = quantity > 0;

  const owner = equipment.ownerInformation;

  return (
    <section className="mx-auto w-full min-w-0 max-w-7xl space-y-5 px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:space-y-6 lg:pb-12 lg:pt-8">

      {/* Back Button */}
      <Link
        href="/equipments"
        className={buttonVariants({
          variant: "ghost",
          className: "-ml-3",
        })}
      >
        <ArrowLeft className="size-4" />
        Back to Equipment
      </Link>

      {/* Page Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

        {/* Left Content */}
        <div className="min-w-0 space-y-6 lg:col-span-2 lg:space-y-8">

          {/* Equipment Image */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted sm:aspect-[16/10]">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={equipment.equipmentName}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ImageOff className="size-12" />
                  <p className="text-sm">No image available</p>
                </div>
              )}

              <Badge
                variant="outline"
                className={`absolute left-3 top-3 capitalize backdrop-blur sm:left-4 sm:top-4 ${getStatusClass(equipment.status)}`}
              >
                {equipment.status || "Pending"}
              </Badge>
            </div>

            {/* Extra images */}
            {extraImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {extraImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
                  >
                    <Image
                      src={image}
                      alt={`${equipment.equipmentName} ${index + 2}`}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 16vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title Section */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{equipment.category}</Badge>

              {equipment.brand && (
                <Badge variant="outline">{equipment.brand}</Badge>
              )}
            </div>

            <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {equipment.equipmentName}
            </h1>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{equipment.location}</span>
            </div>
          </div>

          {/* Description */}
          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="whitespace-pre-line break-words text-sm leading-7 text-muted-foreground">
                {equipment.description ||
                  "No description available for this equipment."}
              </p>
            </CardContent>
          </Card>

          {/* Equipment Specifications */}
          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Equipment Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InformationItem
                  icon={<Tag />}
                  label="Category"
                  value={equipment.category}
                />

                <InformationItem
                  icon={<Package />}
                  label="Available Quantity"
                  value={`${quantity} ${quantity === 1 ? "Unit" : "Units"}`}
                />

                <InformationItem
                  icon={<CalendarDays />}
                  label="Rental Type"
                  value={equipment.rentalType}
                />

                <InformationItem
                  icon={<MapPin />}
                  label="Location"
                  value={equipment.location}
                />

                {equipment.brand && (
                  <InformationItem
                    icon={<Tag />}
                    label="Brand"
                    value={equipment.brand}
                  />
                )}

                {equipment.model && (
                  <InformationItem
                    icon={<Package />}
                    label="Model"
                    value={equipment.model}
                  />
                )}

                {equipment.equipmentCondition && (
                  <InformationItem
                    icon={<ShieldCheck />}
                    label="Condition"
                    value={equipment.equipmentCondition}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Rental Terms */}
          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">
                Rental Terms &amp; Conditions
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {[
                "Equipment must be returned according to the agreed rental period.",
                "Customers are responsible for taking proper care of rented equipment.",
                "Any damage or loss should be reported to the equipment owner.",
                "Rental arrangements should be confirmed with the owner before collection.",
              ].map((term) => (
                <div key={term} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p>{term}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <aside className="min-w-0 space-y-5">

          {/* Rental Price Card */}
          <Card className="border-border/70 shadow-sm lg:sticky lg:top-6">
            <CardContent className="space-y-5 pt-6">

              <div>
                <p className="text-sm text-muted-foreground">Rental Price</p>

                <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-3xl font-bold tracking-tight">
                    ৳{formattedPrice}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    / {equipment.rentalType}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/60 p-3">
                <span className="text-sm text-muted-foreground">
                  Availability
                </span>

                <Badge variant={isAvailable ? "secondary" : "destructive"}>
                  {isAvailable ? `${quantity} Available` : "Unavailable"}
                </Badge>
              </div>

              <div className="space-y-3">
                <BookingModal
                  equipmentName={equipment.equipmentName}
                  rentalPrice={equipment.rentalPrice}
                  rentalType={equipment.rentalType}
                  availableQuantity={equipment.availableQuantity}
                  equipmentId={equipment._id}
                  trigger={
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={!isAvailable}
                    >
                      Rent This Equipment
                    </Button>
                  }
                />
                <AddFavoriteButton equipmentId={equipment._id}/>
              </div>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Contact the owner for rental arrangements and further details.
              </p>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Equipment Owner</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <UserRound className="size-6 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {owner?.name || "Equipment Owner"}
                  </p>

                  <p className="truncate text-sm text-muted-foreground">
                    {owner?.email ||
                      equipment.creatorEmail ||
                      "No email available"}
                  </p>
                </div>
              </div>

              {(owner?.phone || owner?.address) && (
                <div className="space-y-3 border-t pt-4 text-sm">
                  {owner?.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-4 shrink-0" />
                      <span className="break-all">{owner.phone}</span>
                    </div>
                  )}

                  {owner?.address && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0" />
                      <span className="break-words">{owner.address}</span>
                    </div>
                  )}
                </div>
              )}

              <Button variant="outline" className="w-full">
                Contact Owner
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Mobile bottom bar (hidden on desktop, where the price card is sticky) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-1 sm:px-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-tight">
              ৳{formattedPrice}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                / {equipment.rentalType}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {isAvailable ? `${quantity} available` : "Unavailable"}
            </p>
          </div>

          <Button size="lg" disabled={!isAvailable} className="shrink-0">
            Rent Now
          </Button>
        </div>
      </div>
    </section>
  );
}

// Reusable information item
function InformationItem({ icon, label, value, }: { icon: React.ReactNode; label: string; value: string; }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground [&_svg]:size-4">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="mt-1 break-words text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}