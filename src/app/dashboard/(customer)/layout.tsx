import type { ReactNode } from "react";
import { requireRole } from "@/lib/core/server";

export default async function CustomerLayout({children,}: {children: ReactNode;}) {
    await requireRole("customer");

    return children;
}