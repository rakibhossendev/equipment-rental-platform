
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  HardHat,
  ArrowUpRight,
  Home,
  Package,
  Info,
  Mail,
  Workflow,
  LogIn,
  UserPlus,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "All Equipment", href: "/equipment", icon: Package },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact Us", href: "/contact", icon: Mail },
  { label: "How It Works", href: "/how-it-works", icon: Workflow },
];

const authItems = [
  { label: "Login", href: "/sign-in", icon: LogIn },
  { label: "Register", href: "/sign-up", icon: UserPlus },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
     <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4">
        <nav className="glass-nav container-page mx-auto flex min-h-16 items-center justify-between rounded-2xl px-4 sm:px-6">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm transition-transform duration-300 group-hover:rotate-[-6deg]">
              <HardHat size={23} strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Equip<span className="text-brand">Rent</span>
              </span>

              <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground xs:block">
                Equipment Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 xl:px-4 ${
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-brand" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
            >
              Login
            </Link>

            <Link
              href="/sign-up"
              className="group flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
            >
              Register
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-secondary/60 text-foreground backdrop-blur-xl transition-all hover:bg-secondary sm:hidden"
          >
            <Menu size={21} />
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Glass Drawer */}
      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`glass-panel fixed right-0 top-0 z-[70] flex h-dvh w-[min(88vw,380px)] flex-col border-l border-border/70 shadow-2xl transition-transform duration-300 ease-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
              <HardHat size={22} />
            </div>

            <span className="text-lg font-bold tracking-tight text-foreground">
              Equip<span className="text-brand">Rent</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="flex size-9 items-center justify-center rounded-xl bg-secondary/70 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X size={19} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-5 py-6">

          {/* Navigation Links */}
          <div className="space-y-2">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigation
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Icon
                    size={19}
                    className={
                      active
                        ? "text-brand"
                        : "text-muted-foreground transition-colors group-hover:text-foreground"
                    }
                  />

                  {item.label}

                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-brand" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Account Links */}
          <div className="space-y-3 border-t border-border/60 pt-6">
            <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Your Account
            </p>

            {authItems.map((item) => {
              const Icon = item.icon;
              const isRegister = item.href === "/register";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                    isRegister
                      ? "bg-brand text-brand-foreground shadow-sm hover:brightness-95"
                      : "border border-border/70 bg-secondary/50 text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={17} />
                  {isRegister ? "Create an Account" : item.label}

                  {isRegister && <ArrowUpRight size={16} />}
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="mt-auto rounded-2xl border border-border/60 bg-secondary/40 p-4 backdrop-blur-xl">
            <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <HardHat size={19} />
            </div>

            <p className="text-sm font-semibold text-foreground">
              Equipment made accessible.
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Find the right equipment for your next project.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
