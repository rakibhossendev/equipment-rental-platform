"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PackagePlus,
  UploadCloud,
  X,
  MapPin,
  UserRound,
  ClipboardList,
  ArrowLeft,
  Info,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/config/env-config";
import { EquipmentDataType } from "../../../../../typescript/main";

const categories = [
  "Construction",
  "Electronics",
  "Photography",
  "Vehicles",
  "Agriculture",
  "Event",
  "Tools",
  "Other",
];

const rentalTypes = [ "Daily", "Weekly", "Monthly" ];
const conditions = [ "New", "Like New", "Good", "Fair", "Used" ];

const AddEquipments = () => {
  const router = useRouter();
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const [ imageUrl, setImageUrl ] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[ 0 ];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_IMAGEBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      // Save uploaded image URL in state
      setImageUrl(data.data.url);
    } catch (error) {
      console.log(error);
      return
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const equipmentData = { ...Object.fromEntries(formData.entries()), equipmentImage: imageUrl, } as EquipmentDataType;
    console.log(equipmentData)
  };
  console.log(imageUrl)
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <PackagePlus className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Add Equipment
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              List your equipment and make it available for rental.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/equipments")}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Equipment
        </Button>
      </div>

      {/* Information */}
      <div className="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-brand" />

        <p className="text-sm leading-6 text-muted-foreground">
          Provide accurate equipment details, pricing, and availability
          information to help customers make better rental decisions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Equipment Information */}
        <Card className="glass-card border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <PackagePlus className="size-5" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Equipment Information
                </CardTitle>

                <CardDescription>
                  Basic information about your equipment.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-5 pt-6">
            <div className="space-y-2">
              <Label htmlFor="equipmentName">
                Equipment Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="equipmentName"
                name="equipmentName"
                placeholder="e.g. Heavy Duty Excavator"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>

                <select
                  id="category"
                  name="category"
                  defaultValue=""
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipmentCondition">
                  Equipment Condition{" "}
                  <span className="text-destructive">*</span>
                </Label>

                <select
                  id="equipmentCondition"
                  name="equipmentCondition"
                  defaultValue=""
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                >
                  <option value="" disabled>
                    Select condition
                  </option>

                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>

                <Input
                  id="brand"
                  name="brand"
                  placeholder="e.g. Caterpillar"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>

                <Input
                  id="model"
                  name="model"
                  placeholder="e.g. CAT 320D"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>

              <Textarea
                id="description"
                name="description"
                placeholder="Describe your equipment, its features, and usage..."
                rows={5}
                required
                className="resize-y"
              />
            </div>
          </CardContent>
        </Card>

        {/* Equipment Image Drag and Drop */}
        <Card className="glass-card border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <UploadCloud className="size-5" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Equipment Image
                </CardTitle>

                <CardDescription>
                  Upload an image file for your equipment.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />


          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="equipmentImageFile">
                Equipment Image <span className="text-destructive">*</span>
              </Label>

              <div
                className="group relative flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 px-5 py-8 text-center transition-all hover:border-primary/50 hover:bg-muted/60"
              >
                <input
                  id="equipmentImageFile"
                  name="equipmentImageFile"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  required={!selectedFile}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />

                {selectedFile ? (
                  <div className="relative z-20 flex w-full flex-col items-center gap-3">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FileText className="size-7" />
                    </div>

                    <div className="space-y-1">
                      <p className="max-w-xs truncate text-sm font-semibold text-foreground">
                        {selectedFile.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-1 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                    >
                      <X className="mr-2 size-4" />
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="pointer-events-none flex flex-col items-center">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <UploadCloud className="size-7" />
                    </div>

                    <p className="text-sm font-semibold text-foreground">
                      Drag and drop your image here
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      or <span className="font-medium text-primary underline underline-offset-4">browse files</span>
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                      <span className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                        PNG
                      </span>
                      <span className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                        JPG
                      </span>
                      <span className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                        WEBP
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                      Maximum file size: 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>

        </Card>

        {/* Rental Information */}
        <Card className="glass-card border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <ClipboardList className="size-5" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Rental Information
                </CardTitle>

                <CardDescription>
                  Set rental pricing and equipment availability.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-5 pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rentalPrice">
                  Rental Price (BDT){" "}
                  <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="rentalPrice"
                  name="rentalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 2500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentalType">
                  Rental Type <span className="text-destructive">*</span>
                </Label>

                <select
                  id="rentalType"
                  name="rentalType"
                  defaultValue=""
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                >
                  <option value="" disabled>
                    Select rental duration
                  </option>

                  {rentalTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availableQuantity">
                Available Quantity{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input
                id="availableQuantity"
                name="availableQuantity"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 5"
                required
              />

              <p className="text-xs text-muted-foreground">
                How many units of this equipment are available for rent?
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="glass-card border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <MapPin className="size-5" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Location Information
                </CardTitle>

                <CardDescription>
                  Where is your equipment available for pickup?
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="location">
                Equipment Location{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input
                id="location"
                name="location"
                placeholder="e.g. Jashore, Bangladesh"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card className="glass-card border-border/70 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <UserRound className="size-5" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Owner Information
                </CardTitle>

                <CardDescription>
                  Contact details for rental inquiries.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-5 pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ownerName">
                  Owner Name <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="ownerName"
                  name="ownerInformation.name"
                  placeholder="Enter owner name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">
                  Email Address <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="ownerEmail"
                  name="ownerInformation.email"
                  type="email"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ownerPhone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="ownerPhone"
                  name="ownerInformation.phone"
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerAddress">
                  Owner Address
                </Label>

                <Input
                  id="ownerAddress"
                  name="ownerInformation.address"
                  placeholder="Enter owner address"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rental Terms */}
        <Card className="glass-card border-border/70 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">
              Rental Terms & Conditions
            </CardTitle>

            <CardDescription>
              Specify the rules and conditions customers must follow.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="rentalTermsAndConditions">
                Terms & Conditions{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Textarea
                id="rentalTermsAndConditions"
                name="rentalTermsAndConditions"
                placeholder="Write your rental rules, security deposit requirements, damage policy, return conditions, etc."
                rows={5}
                required
                className="resize-y"
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/equipments")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <PackagePlus className="mr-2 size-4" />
            Add Equipment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEquipments;