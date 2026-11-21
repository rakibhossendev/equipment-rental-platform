
"use client";

import { useState } from "react";
import { Pencil, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Equipment } from "../../../../../typescript/main";
import { updateMyEquipment } from "@/lib/action/equipment/edit-owner";

type Props = {
  equipment: Equipment;
  onUpdated: () => void;
};

export default function EditMyEquipmentDialog({
  equipment,
  onUpdated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    equipmentName: equipment.equipmentName ?? "",
    description: equipment.description ?? "",
    category: equipment.category ?? "",
    location: equipment.location ?? "",
    rentalPrice: String(equipment.rentalPrice ?? ""),
    rentalType: equipment.rentalType ?? "Daily",
    availableQuantity: String(equipment.availableQuantity ?? ""),
    equipmentCondition: equipment.equipmentCondition ?? "",
    brand: equipment.brand ?? "",
    model: equipment.model ?? "",
    equipmentImage: Array.isArray(equipment.equipmentImage)
      ? equipment.equipmentImage.join(", ")
      : equipment.equipmentImage ?? "",
    rentalTermsAndConditions:
      equipment.rentalTermsAndConditions ?? "",
    ownerName: equipment.ownerInformation?.name ?? "",
    ownerPhone: equipment.ownerInformation?.phone ?? "",
    ownerAddress: equipment.ownerInformation?.address ?? "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!formData.equipmentName.trim()) {
      toast.error("Equipment name is required");
      return;
    }

    if (
      formData.rentalPrice.trim() === "" ||
      !Number.isFinite(Number(formData.rentalPrice)) ||
      Number(formData.rentalPrice) < 0
    ) {
      toast.error("Enter a valid rental price");
      return;
    }

    if (
      formData.availableQuantity.trim() === "" ||
      !Number.isInteger(Number(formData.availableQuantity)) ||
      Number(formData.availableQuantity) < 0
    ) {
      toast.error("Enter a valid available quantity");
      return;
    }

    try {
      setIsUpdating(true);

      await updateMyEquipment(equipment._id, {
        equipmentName: formData.equipmentName,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        rentalPrice: Number(formData.rentalPrice),
        rentalType: formData.rentalType,
        availableQuantity: Number(formData.availableQuantity),
        equipmentCondition: formData.equipmentCondition,
        brand: formData.brand,
        model: formData.model,
        equipmentImage: formData.equipmentImage,
        rentalTermsAndConditions: formData.rentalTermsAndConditions,
        ownerInformation: {
          name: formData.ownerName,
          phone: formData.ownerPhone,
          address: formData.ownerAddress,
        },
      });

      toast.success("Equipment updated successfully!");
      setOpen(false);
      onUpdated();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update equipment"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="icon"
        variant="ghost"
        title="Update Equipment"
        className="size-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
        onClick={() => setOpen(true)}
      >
        <Pencil className="size-4" />
      </Button>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Equipment</DialogTitle>
          <DialogDescription>
            Edit your equipment information and save changes.
            Approved equipment will require admin approval again.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Equipment Name", field: "equipmentName" },
            { label: "Category", field: "category" },
            { label: "Location", field: "location" },
            { label: "Rental Price", field: "rentalPrice", type: "number" },
            { label: "Rental Type", field: "rentalType" },
            { label: "Available Quantity", field: "availableQuantity", type: "number" },
            { label: "Condition", field: "equipmentCondition" },
            { label: "Brand", field: "brand" },
            { label: "Model", field: "model" },
            { label: "Equipment Image URL", field: "equipmentImage" },
            { label: "Owner Name", field: "ownerName" },
            { label: "Owner Phone", field: "ownerPhone" },
            { label: "Owner Address", field: "ownerAddress" },
          ].map((item) => (
            <div key={item.field} className="space-y-2">
              <label className="text-sm font-medium">{item.label}</label>
              <Input
                type={item.type || "text"}
                min={item.type === "number" ? 0 : undefined}
                value={formData[item.field as keyof typeof formData]}
                onChange={(e) =>
                  handleChange(
                    item.field as keyof typeof formData,
                    e.target.value
                  )
                }
              />
            </div>
          ))}

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">
              Rental Terms and Conditions
            </label>
            <Textarea
              rows={3}
              value={formData.rentalTermsAndConditions}
              onChange={(e) =>
                handleChange("rentalTermsAndConditions", e.target.value)
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={isUpdating}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
