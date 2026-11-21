import Link from "next/link";
import { HardHat } from "lucide-react";

import { homeCategories } from "../Home/categories-data";

// Links whose pages exist in the project.
const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Equipment", href: "/equipments" },
];

// Pages that do not exist yet — shown as plain text so the
// footer never contains broken links.
const unavailableLinks = [ "About Us", "Contact Us" ];

/**
 * Site footer for all public pages. Server component — no
 * client-side interactivity required.
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card/60">
            {/* Main footer */}
            <div className="container-page grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-3">
                {/* Brand */}
                <div className="space-y-4 sm:pr-6">
                    <Link href="/" className="group flex w-fit items-center gap-2.5">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm transition-transform duration-300 group-hover:rotate-[-6deg]">
                            <HardHat size={23} strokeWidth={2.2} />
                        </div>

                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Equip<span className="text-brand">Rent</span>
                        </span>
                    </Link>

                    <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                        Your trusted platform for renting quality equipment.
                        Find the right tools for every project with affordable
                        prices and hassle-free booking.
                    </p>
                </div>

                {/* Quick Links */}
                <nav aria-label="Quick links">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Quick Links
                    </h3>

                    <ul className="mt-4 space-y-3">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        {unavailableLinks.map((label) => (
                            <li key={label}>
                                <span className="text-sm text-muted-foreground/60">
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Equipment Categories */}
                <nav aria-label="Equipment categories">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Equipment Categories
                    </h3>

                    <ul className="mt-4 space-y-3">
                        {homeCategories.map((category) => (
                            <li key={category.value}>
                                <Link
                                    href={`/equipments?category=${category.value}`}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                                >
                                    {category.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border/60">
                <div className="container-page flex flex-col items-center justify-center gap-1.5 py-5 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} EquipRent. All rights reserved.
                    </p>

                    <p className="text-xs font-medium text-muted-foreground">
                        Making equipment rental simple.
                    </p>
                </div>
            </div>
        </footer>
    );
}
