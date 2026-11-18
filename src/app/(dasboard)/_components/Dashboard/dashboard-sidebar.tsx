"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  HardHat,
  LayoutDashboard,
  ChevronUp,
  UserRound,
  LogOut,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import { dashboardMenuItem } from "../../data/menu-data";
import { getDashboardIcon } from "./dashboard-icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface DashboardSidebarProps {
  role: keyof typeof dashboardMenuItem;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase() || "U";

export default function DashboardSidebar({
  role,
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuItems = dashboardMenuItem[role];
  
  const closeMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

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

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const navigationItems = [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    ...menuItems.map((item) => ({
      ...item,
      icon: getDashboardIcon(item.icon),
    })),
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/70">
      {/* Brand */}
      <SidebarHeader className="border-b border-border/60 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="EquipRent"
              className="h-12 rounded-xl"
              render={
                <Link
                  href="/"
                  onClick={closeMobile}
                  className="flex items-center gap-3"
                />
              }
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                <HardHat className="size-5" />
              </div>

              <div className="grid min-w-0 flex-1 text-left leading-tight">
                <span className="text-base font-bold tracking-tight">
                  EquipRent
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Equipment Rental
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Workspace
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.url ||
                (item.url !== "/dashboard" &&
                  pathname.startsWith(`${item.url}/`));

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    className={`h-11 rounded-xl px-3 transition-all duration-200 [&>svg]:size-[18px] ${
                      isActive
                        ? "bg-brand text-brand-foreground font-semibold shadow-sm hover:bg-brand/90 hover:text-brand-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                    render={<Link href={item.url} onClick={closeMobile} />}
                  >
                    <Icon className="shrink-0" />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User Account */}
      <SidebarFooter className="border-t border-border/60 p-3">
        <div className="flex items-center gap-2">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl p-2 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <Avatar className="size-9 shrink-0 rounded-xl ring-1 ring-border/70">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-xl bg-brand/10 text-xs font-bold text-brand">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="grid min-w-0 flex-1 leading-tight">
                <span className="truncate text-sm font-semibold">
                  {user.name}
                </span>
                <span className="truncate text-xs capitalize text-muted-foreground">
                  {role}
                </span>
              </div>

              <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? "top" : "right"}
              align="end"
              sideOffset={10}
              className="min-w-60 rounded-xl border border-border/60 bg-popover/85 shadow-xl shadow-black/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-popover/70"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-3 font-normal">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 rounded-xl">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name}
                      />
                      <AvatarFallback className="rounded-xl bg-brand/10 text-brand">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid min-w-0 flex-1 gap-1">
                      <span className="truncate text-sm font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="mx-1 cursor-pointer gap-2 rounded-lg"
                render={
                  <Link href="/dashboard/profile" onClick={closeMobile} />
                }
              >
                <UserRound className="size-4" />
                Edit profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />
               <DropdownMenuItem
                className="mx-1 cursor-pointer gap-2 rounded-lg"
                render={
                  <Link href="/" onClick={closeMobile} />
                }
              >
                <UserRound className="size-4" />
                Home
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                disabled={isSigningOut}
                onClick={() => void handleSignOut()}
                className="mx-1 cursor-pointer gap-2 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                {isSigningOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}

                {isSigningOut ? "Signing out..." : "Sign out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Sign Out */}
          <button
            type="button"
            onClick={() => void handleSignOut()}
            disabled={isSigningOut}
            title="Sign out"
            aria-label="Sign out"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 text-muted-foreground transition-all duration-200 hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSigningOut ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}