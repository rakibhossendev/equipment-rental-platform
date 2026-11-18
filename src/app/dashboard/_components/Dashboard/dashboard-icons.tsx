import {
  ClipboardList,
  Heart,
  LayoutDashboard,
  Package,
  PlusCircle,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the string icon names used in `menu-data.ts` to real lucide components.
 * To use a new icon: import it above and add it here.
 */
export const dashboardIcons: Record<string, LucideIcon> = {
  ClipboardList,
  Heart,
  LayoutDashboard,
  Package,
  PlusCircle,
  User,
  Users,
};

export const getDashboardIcon = (name?: string): LucideIcon =>
  (name && dashboardIcons[name]) || LayoutDashboard;