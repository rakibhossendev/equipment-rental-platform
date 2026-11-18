
import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/Dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {children}
    </SidebarProvider>
  );
}
