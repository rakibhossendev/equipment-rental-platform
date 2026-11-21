
"use client";

import { FormEvent, useState, type ReactNode } from "react";
import {
  CalendarDays,
  Package,
  MapPin,
  Phone,
  FileText,
  LoaderCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createStripePayment } from "@/lib/action/payment/stripePayment";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface BookingModalProps {
  equipmentId: string;
  equipmentName: string;
  rentalPrice: number;
  rentalType: string;
  availableQuantity: number;
  trigger?: ReactNode;
}

export default function BookingModal({
  equipmentId,
  equipmentName,
  rentalPrice,
  rentalType,
  availableQuantity,
  trigger,
}: BookingModalProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRentalDuration = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    const difference = end.getTime() - start.getTime();

    if (difference < 0) return 0;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (rentalType === "Daily") return days + 1;
    if (rentalType === "Weekly") return Math.ceil((days + 1) / 7);
    if (rentalType === "Monthly") return Math.ceil((days + 1) / 30);

    return 0;
  };

  const duration = getRentalDuration();

  const totalPrice = rentalPrice * duration * Number(quantity || 1);

  const handleSubmitPayment = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await createStripePayment({
        equipmentId,
        userEmail: session?.user.email,
        startDate,
        endDate,
        quantity: Number(quantity),
      });

      window.location.href = result.checkoutUrl;
    } catch (error) {
      console.error("Payment initialization error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div
        onClick={() => {
          if (availableQuantity > 0) {
            setOpen(true);
          }
        }}
      >
        {trigger}
      </div>

      {/* Booking Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Book Equipment
            </DialogTitle>

            <DialogDescription>
              Fill in the details below to request your equipment rental.
            </DialogDescription>
          </DialogHeader>

          {/* Equipment Summary */}
          <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/40 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background">
                <Package className="size-5 text-brand" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {equipmentName}
                </p>

                <p className="text-xs text-muted-foreground">
                  {availableQuantity} units available
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-lg font-bold text-brand">
                ৳{totalPrice.toLocaleString("en-BD")}
              </p>

              <p className="text-xs text-muted-foreground">
                {quantity} × {duration} {rentalType.toLowerCase()}
              </p>

              <p className="text-xs text-muted-foreground">
                ৳{rentalPrice.toLocaleString("en-BD")} / {rentalType}
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmitPayment} className="space-y-5">
            {/* Rental Dates */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-brand" />
                <h3 className="text-sm font-semibold">
                  Rental Period
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">
                    Rental Start Date
                  </Label>

                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={startDate}
                    onChange={(event) =>
                      setStartDate(event.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">
                    Rental End Date
                  </Label>

                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    min={startDate || undefined}
                    value={endDate}
                    onChange={(event) =>
                      setEndDate(event.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">
                Required Quantity
              </Label>

              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                max={availableQuantity}
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
                required
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber">
                Contact Number
              </Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">
                Delivery Address
              </Label>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />

                <Textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  placeholder="Enter your complete delivery address..."
                  className="min-h-20 pl-9"
                  required
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">
                Additional Notes
                <span className="ml-1 text-muted-foreground">
                  (Optional)
                </span>
              </Label>

              <div className="relative">
                <FileText className="absolute left-3 top-3 size-4 text-muted-foreground" />

                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any special instructions..."
                  className="min-h-20 pl-9"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Continue to Booking"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
