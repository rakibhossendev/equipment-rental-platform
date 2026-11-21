"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteMyEquipment } from "@/lib/action/equipment/delete-owner";

type DeleteOwnerEquipmentDialogProps = {
  equipmentId: string;
  onDeleted: () => void;
};

export default function DeleteOwnerEquipmentDialog({
  equipmentId,
  onDeleted,
}: DeleteOwnerEquipmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteMyEquipment(equipmentId);

      toast.success("Equipment deleted successfully!");
      setOpen(false);
      onDeleted();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete equipment"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        aria-label="Delete equipment"
        title="Delete"
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </button>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this equipment listing? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
