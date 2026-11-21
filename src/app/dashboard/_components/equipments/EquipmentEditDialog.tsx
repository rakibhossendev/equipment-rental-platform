
"use client";

import { useState } from "react";
import { Pencil, LoaderCircle } from "lucide-react";
import { toast } from "sonner";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateEquipment } from "@/lib/action/equipment/admin-edit-equipment";
import type { Equipment } from "../../../../../typescript/main";

type Props = {
    equipment: Equipment;
    onUpdated: () => void;
};

export default function EditEquipmentDialog({
    equipment,
    onUpdated,
}: Props) {
    const [ open, setOpen ] = useState(false);
    const [ isUpdating, setIsUpdating ] = useState(false);

    const [ formData, setFormData ] = useState({
        equipmentName: equipment.equipmentName,
        description: equipment.description,
        category: equipment.category,
        location: equipment.location,
        rentalPrice: String(equipment.rentalPrice),
        rentalType: equipment.rentalType,
        availableQuantity: String(equipment.availableQuantity),
        equipmentCondition: equipment.equipmentCondition,
        brand: equipment.brand,
        model: equipment.model,
        equipmentImage: equipment.equipmentImage,
        rentalTermsAndConditions:
            equipment.rentalTermsAndConditions ?? "",
    });

    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [ field ]: value,
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

            await updateEquipment(equipment._id!, {
                ...formData,
                rentalPrice: Number(formData.rentalPrice),
                availableQuantity: Number(formData.availableQuantity),
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
            <button
                type="button"
                aria-label="Edit equipment"
                title="Edit"
                onClick={() => setOpen(true)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
                <Pencil className="size-4" />
            </button>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Equipment</DialogTitle>
                    <DialogDescription>
                        Update the equipment information below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Equipment Name</label>
                        <Input
                            value={formData.equipmentName}
                            onChange={(e) =>
                                handleChange("equipmentName", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input
                            value={formData.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rental Price</label>
                        <Input
                            type="number"
                            min="0"
                            value={formData.rentalPrice}
                            onChange={(e) =>
                                handleChange("rentalPrice", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rental Type</label>
                        <Input
                            value={formData.rentalType}
                            onChange={(e) =>
                                handleChange("rentalType", e.target.value)
                            }
                            placeholder="Daily / Weekly / Monthly"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Available Quantity
                        </label>
                        <Input
                            type="number"
                            min="0"
                            value={formData.availableQuantity}
                            onChange={(e) =>
                                handleChange("availableQuantity", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                            value={formData.location}
                            onChange={(e) =>
                                handleChange("location", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Condition</label>
                        <Input
                            value={formData.equipmentCondition}
                            onChange={(e) =>
                                handleChange("equipmentCondition", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Brand</label>
                        <Input
                            value={formData.brand}
                            onChange={(e) => handleChange("brand", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Model</label>
                        <Input
                            value={formData.model}
                            onChange={(e) => handleChange("model", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Equipment Image URL</label>
                        <Input
                            value={formData.equipmentImage}
                            onChange={(e) =>
                                handleChange("equipmentImage", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
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
                                handleChange(
                                    "rentalTermsAndConditions",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isUpdating}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleUpdate}
                        disabled={isUpdating}
                    >
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
