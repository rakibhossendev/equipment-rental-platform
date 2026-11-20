
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { env } from "@/config/env-config";
import { updateProfile } from "@/lib/action/users/update-profile";
import type { UserType } from "../../../../../typescript/main";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  user: UserType;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.image || "");
  const [preview, setPreview] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");

  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Upload profile image to ImageBB
  const handleImageChange = async ( event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,{
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      setImageUrl(data.data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      setPreview(null);
      toast.error(
        error instanceof Error ? error.message : "Image upload failed"
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  // Update profile information
  const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isUploading) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    try {
      setLoading(true);
      await updateProfile({name,image: imageUrl,phoneNumber,address,});
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleUpdateProfile} className="space-y-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative size-24 overflow-hidden rounded-full border bg-secondary">
              {preview || imageUrl ? (
                <Image
                  src={preview || imageUrl}
                  alt="Profile image"
                  fill
                  sizes="96px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex size-full items-center justify-center text-2xl font-semibold">
                  {name.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="space-y-2 text-center">
              <Label
                htmlFor="profileImage"
                className="cursor-pointer text-sm font-medium text-brand"
              >
                {isUploading ? "Uploading Image..." : "Choose Profile Image"}
              </Label>

              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploading || loading}
                className="max-w-xs cursor-pointer"
              />

              <p className="text-xs text-muted-foreground">
                Select an image to update your profile picture.
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={user.email}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Email address cannot be changed.
            </p>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter your address"
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading || isUploading}
            className="w-full sm:w-auto"
          >
            {loading
              ? "Updating..."
              : isUploading
                ? "Uploading Image..."
                : "Save Changes"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
