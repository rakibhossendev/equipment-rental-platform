"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, UserRound, LogOut, Loader2, ToolCaseIcon } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface UserProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ProfileAvatarProps {
  user: UserProps;
  onClose?: () => void;
  className?: string;
}

const getInitials = (name?: string | null) =>
  (name ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[ 0 ] ?? "")
    .join("")
    .toUpperCase() || "U";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "All Equipments", href: "/equipments", icon: ToolCaseIcon },
  { label: "Edit profile", href: "/dashboard/profile", icon: UserRound }
];

export default function ProfileAvatar({
  user,
  onClose,
  className = "",
}: ProfileAvatarProps) {
  const router = useRouter();
  const [ isSigningOut, setIsSigningOut ] = useState(false);

  const displayName = user.name?.trim() || "User";

  const handleSignOut = async () => {
    if (isSigningOut) return;

    try {
      setIsSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Failed to sign out.");
        return;
      }

      toast.success("Signed out successfully.");
      onClose?.();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <section
      role="dialog"
      aria-label="Account menu"
      className={`glass-strong w-72 overflow-hidden rounded-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 ${className}`}
    >
      {/* Profile */}
      <div className="flex flex-col items-center gap-3 px-5 pb-5 pt-6 text-center">
        <Avatar className="size-20 rounded-full ring-4 ring-background/60 shadow-md">
          <AvatarImage
            src={user.image ?? undefined}
            alt={displayName}
            className="rounded-full object-cover"
          />
          <AvatarFallback className="rounded-full bg-brand/15 text-xl font-bold text-brand">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="grid w-full min-w-0 gap-0.5">
          <h2 className="truncate text-base font-semibold tracking-tight text-foreground">
            {displayName}
          </h2>
          {user.email && (
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>
      </div>

      <div className="mx-4 h-px bg-border/70" />

      {/* Links */}
      <nav className="grid gap-1 p-2">
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="size-[18px] text-muted-foreground" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mx-4 h-px bg-border/70" />

      {/* Logout */}
      <div className="p-2">
        <button
          type="button"
          onClick={() => void handleSignOut()}
          disabled={isSigningOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningOut ? (
            <Loader2 className="size-[18px] animate-spin" />
          ) : (
            <LogOut className="size-[18px]" />
          )}
          {isSigningOut ? "Signing out..." : "Logout"}
        </button>
      </div>
    </section>
  );
}