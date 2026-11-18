"use client";

import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
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
  Loader2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { env } from "@/config/env-config";
import { EquipmentDataType } from "../../../../../typescript/main";
import { useSession } from "@/lib/auth-client";
import { addEquipment } from "@/lib/action/add-equipment/add-equipment";
import { toast } from "sonner";

const categories = ["Construction", "Electronics", "Photography", "Vehicles", "Agriculture", "Event", "Tools", "Other"];
const rentalTypes = ["Daily", "Weekly", "Monthly"];
const conditions = ["New", "Like New", "Good", "Fair", "Used"];
const MAX_SIZE = 5 * 1024 * 1024;

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  options?: string[];
  textarea?: boolean;
  hint?: string;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
};

const Field = ({ label, name, required, options, textarea, hint, ...props }: FieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={name}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>

    {options ? (
      <select id={name} name={name} defaultValue="" required={required} className={selectClass}>
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : textarea ? (
      <Textarea id={name} name={name} required={required} rows={5} className="resize-y" {...props} />
    ) : (
      <Input id={name} name={name} required={required} {...props} />
    )}

    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div className="grid gap-5 sm:grid-cols-2">{children}</div>
);

const Section = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <Card className="glass-card border-border/70 shadow-none">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="size-5" />
        </div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <Separator />
    <CardContent className="space-y-5 pt-6">{children}</CardContent>
  </Card>
);

const AddEquipments = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Free the temporary preview URL when it changes or on unmount
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const removeImage = () => {
    setPreview(null);
    setImageUrl(null);
    setError("");
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setError("Image must be 5MB or smaller.");
      event.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));
    setImageUrl(null);
    setError("");
    setUploading(true);

    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,{ method: "POST", body });
      const json = await res.json();

      if (!res.ok || !json.success) throw new Error(json.error?.message || "Image upload failed");

      setImageUrl(json.data.url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Image upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageUrl) {
      setError("Please upload an equipment image.");
      return;
    }

    // Build the payload and turn "ownerInformation.name" keys into a nested object
    const data: Record<string, unknown> = { equipmentImage: imageUrl, creatorEmail: session?.user?.email || "" };
    for (const [key, value] of new FormData(event.currentTarget)) {
      const [parent, child] = key.split(".");
      data[parent] = child ? { ...(data[parent] as object), [child]: value } : value;
    }

    const equipmentData = data as unknown as EquipmentDataType;
    const result = await addEquipment(equipmentData);
    if(!result.success) {
      toast.error(result.message || "Failed to add equipment.");
      return;
    } 
    toast.success("Equipment added successfully."); 
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <PackagePlus className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Add Equipment</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              List your equipment and make it available for rental.
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={() => router.push("/dashboard/equipments")}>
          <ArrowLeft className="mr-2 size-4" />
          Back to Equipment
        </Button>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-brand" />
        <p className="text-sm leading-6 text-muted-foreground">
          Provide accurate equipment details, pricing, and availability information to help customers
          make better rental decisions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Section icon={PackagePlus} title="Equipment Information" description="Basic information about your equipment.">
          <Field label="Equipment Name" name="equipmentName" placeholder="e.g. Heavy Duty Excavator" required />
          <Row>
            <Field label="Category" name="category" options={categories} required />
            <Field label="Equipment Condition" name="equipmentCondition" options={conditions} required />
          </Row>
          <Row>
            <Field label="Brand" name="brand" placeholder="e.g. Caterpillar" />
            <Field label="Model" name="model" placeholder="e.g. CAT 320D" />
          </Row>
          <Field
            label="Description"
            name="description"
            textarea
            required
            placeholder="Describe your equipment, its features, and usage..."
          />
        </Section>

        <Section icon={UploadCloud} title="Equipment Image" description="Upload an image file for your equipment.">
          <div className="space-y-2">
            <Label>
              Equipment Image <span className="text-destructive">*</span>
            </Label>

            {preview ? (
              <div className="relative overflow-hidden rounded-xl border border-border bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Equipment preview" className="max-h-80 w-full object-contain" />

                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/70 text-sm font-medium">
                    <Loader2 className="size-4 animate-spin" />
                    Uploading...
                  </div>
                )}

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute right-3 top-3 size-8 rounded-full"
                  onClick={removeImage}
                  disabled={uploading}
                  aria-label="Remove image"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <div className="group relative flex min-h-56 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-5 py-8 text-center transition-all hover:border-primary/50 hover:bg-muted/60">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />

                <div className="pointer-events-none flex flex-col items-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <UploadCloud className="size-7" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Drag and drop your image here</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    or <span className="font-medium text-primary underline underline-offset-4">browse files</span>
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">PNG, JPG or WEBP - max 5MB</p>
                </div>
              </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </Section>

        <Section icon={ClipboardList} title="Rental Information" description="Set rental pricing and equipment availability.">
          <Row>
            <Field label="Rental Price (BDT)" name="rentalPrice" type="number" min="0" step="0.01" placeholder="e.g. 2500" required />
            <Field label="Rental Type" name="rentalType" options={rentalTypes} required />
          </Row>
          <Field
            label="Available Quantity"
            name="availableQuantity"
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 5"
            hint="How many units of this equipment are available for rent?"
            required
          />
        </Section>

        <Section icon={MapPin} title="Location Information" description="Where is your equipment available for pickup?">
          <Field label="Equipment Location" name="location" placeholder="e.g. Jashore, Bangladesh" required />
        </Section>

        <Section icon={UserRound} title="Owner Information" description="Contact details for rental inquiries.">
          <Row>
            <Field label="Owner Name" name="ownerInformation.name" placeholder="Enter owner name" required />
            <Field label="Email Address" name="ownerInformation.email" type="email" placeholder="example@email.com" required />
          </Row>
          <Row>
            <Field label="Phone Number" name="ownerInformation.phone" type="tel" placeholder="+880 1XXXXXXXXX" required />
            <Field label="Owner Address" name="ownerInformation.address" placeholder="Enter owner address" />
          </Row>
        </Section>

        <Section
          icon={ClipboardList}
          title="Rental Terms & Conditions"
          description="Specify the rules and conditions customers must follow."
        >
          <Field
            label="Terms & Conditions"
            name="rentalTermsAndConditions"
            textarea
            required
            placeholder="Write your rental rules, security deposit requirements, damage policy, return conditions, etc."
          />
        </Section>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/equipments")}>
            Cancel
          </Button>
          <Button type="submit" disabled={uploading} className="bg-brand text-brand-foreground hover:bg-brand/90">
            <PackagePlus className="mr-2 size-4" />
            Add Equipment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEquipments;