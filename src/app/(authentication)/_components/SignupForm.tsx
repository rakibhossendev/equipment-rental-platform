"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  UserRound,
  Mail,
  LockKeyhole,
  ArrowRight,
  Camera,
  ImagePlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { env } from "@/config/env-config";
import validatePassword from "@/lib/utils/verify-password";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpType } from "../../../../typescript/main";


interface SignupFormProps {
  isPending?: boolean;
}

export default function SignupForm({ isPending = false, }: SignupFormProps) {
  const router = useRouter();
  const [ preview, setPreview ] = useState<string | null>(null);
  const [ isUploading, setIsUploading ] = useState(false);
  const [ imageUrl, setImageUrl ] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[ 0 ];

    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsUploading(true);
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
    } catch {
      setImageUrl(null);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };


  const handleGoogleSignin = async () => {
    const data = await signIn.social({
      provider: "google",
      callbackURL: "/equipments"
    });

    if(data.error) {
      toast.error(data.error.message);
      return;
    }
    router.push("/equipments");
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isUploading) return;

    const formData = new FormData(event.currentTarget);

    // Remove the actual File object
    formData.delete("profileImage");
    const getUserData = { ...Object.fromEntries(formData.entries()), profileImageUrl: imageUrl, } as SignUpType;
    const isValidPassword = validatePassword(getUserData.password, getUserData.confirmPassword);

    if (isValidPassword) {
      const { error } = await signUp.email({
        name: getUserData.name,
        email: getUserData.email,
        password: getUserData.password,
        image: getUserData.profileImageUrl,
        callbackURL: "/equipments"
      })

      if (error) {
        toast.error(error.message);
        return
      }
      toast.success("Account created successfully!");
      router.push("/equipments")
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Profile Image */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <label
            htmlFor="profileImage"
            className="group flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-secondary/60 transition hover:border-brand"
          >
            {preview ? (
              <Image
                width={96}
                height={96}
                src={preview}
                alt="Profile preview"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-muted-foreground transition group-hover:text-brand">
                <ImagePlus className="size-7" />
                <span className="text-[10px] font-medium">Upload</span>
              </div>
            )}
          </label>

          <div className="pointer-events-none absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-background bg-brand text-brand-foreground">
            <Camera className="size-3.5" />
          </div>

          {preview && (
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute -right-2 -top-1 flex size-6 items-center justify-center rounded-full bg-destructive text-white shadow"
              aria-label="Remove profile image"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="text-center">
          <Label
            htmlFor="profileImage"
            className="cursor-pointer text-sm font-semibold hover:text-brand"
          >
            Profile photo
          </Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload a profile picture (optional)
          </p>
        </div>

        <Input
          id="profileImage"
          name="profileImage"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold">
          Full name
        </Label>

        <div className="relative">
          <UserRound className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            className="h-12 rounded-xl border-border/70 bg-background/60 pl-11 shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold">
          Email address
        </Label>

        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="h-12 rounded-xl border-border/70 bg-background/60 pl-11 shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold">
          Password
        </Label>

        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            className="h-12 rounded-xl border-border/70 bg-background/60 pl-11 shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Use at least 8 characters for a secure password.
        </p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-semibold">
          Confirm password
        </Label>

        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            className="h-12 rounded-xl border-border/70 bg-background/60 pl-11 shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="terms"
          className="mt-0.5 data-[state=checked]:border-brand data-[state=checked]:bg-brand"
        />

        <Label
          htmlFor="terms"
          className="cursor-pointer text-xs font-normal leading-relaxed text-muted-foreground"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </Label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="group h-12 w-full cursor-pointer rounded-xl bg-brand text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/15 transition-all hover:brightness-95 active:scale-[0.99]"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      {/* Login */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />
        <span className="px-4 text-xs font-medium text-muted-foreground">
          OR CONTINUE WITH EMAIL
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {/* Google Signup */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignin}
        className="h-12 w-full rounded-xl border-border/70 bg-background/60 font-semibold hover:bg-secondary"
      >
        <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
          <path
            fill="#FFC107"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.7c3.9-3.6 6-8.9 6-14.9Z"
          />
          <path
            fill="#FF3D00"
            d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5c-1.8 1.2-4 1.9-6.8 1.9-5.3 0-9.8-3.6-11.4-8.4H5.7v5.2A20 20 0 0 0 24 44Z"
          />
          <path
            fill="#4CAF50"
            d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.7a20 20 0 0 0 0 17.8l6.9-5.2Z"
          />
          <path
            fill="#1976D2"
            d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.7 15.1l6.9 5.2C14.2 15.6 18.7 12 24 12Z"
          />
        </svg>
        Continue with Google
      </Button>


    </form>
  );
}