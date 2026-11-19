import type { ReactNode } from "react";
import { requireRole } from "@/lib/core/server";

export default async function OwnerLayout({children,}: {children: ReactNode;}) {
    await requireRole("owner");

    return children;
}