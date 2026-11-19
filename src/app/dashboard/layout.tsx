import type { ReactNode } from "react";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import DashboardSidebar from "./_components/Dashboard/dashboard-sidebar";
import { requireRole } from "@/lib/core/server";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireRole("admin", "owner", "customer");

  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset className="min-w-0">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}