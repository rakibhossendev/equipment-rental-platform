"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

interface SignInFormProps {
  isPending?: boolean;
}

export default function SignInForm({ isPending = false }: SignInFormProps) {
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      const { error } = await signIn.email({
        email: email,
        password: password,
        callbackURL: "/equipments",
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        return;
      }

      toast.success("Signed in successfully!");
      router.push("/equipments");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignin = async () => {
    const data = await signIn.social({
      provider: "google",
      callbackURL: "/equipments"
    });

    if (data.error) {
      toast.error(data.error.message);
      return;
    }
    router.push("/equipments");
    router.refresh();
  };

  const pendingState = isPending || loading;

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
            required
            className="h-12 rounded-xl border-border/70 bg-background/60 pl-11 shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password
          </Label>
        </div>

        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="h-12 rounded-xl border-border/70 bg-background/60 pl-11 shadow-none focus-visible:border-brand focus-visible:ring-brand/20"
          />
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            className="data-[state=checked]:border-brand data-[state=checked]:bg-brand"
          />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-xs font-normal text-muted-foreground"
          >
            Remember me
          </Label>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={pendingState}
        className="group h-12 w-full cursor-pointer rounded-xl bg-brand text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/15 transition-all hover:brightness-95 active:scale-[0.99]"
      >
        {pendingState ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>

      {/* Register Redirect */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>

      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />
        <span className="px-4 text-xs font-medium text-muted-foreground">
          OR CONTINUE WITH
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google Signin */}
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