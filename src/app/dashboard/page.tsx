
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowUpRight,
  Package,
  CalendarDays,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { dashboardMenuItem } from "./data/menu-data";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const role = session.user.role;

  if (!role || !(role in dashboardMenuItem)) {
    redirect("/unauthorized");
  }

  const user = {
    name: session.user.name || "User",
    email: session.user.email,
    image: session.user.image,
  };

  const stats = [
    {
      title: "Total Rentals",
      value: "—",
      description: "Your rental activities",
      icon: Package,
    },
    {
      title: "Active Bookings",
      value: "—",
      description: "Currently ongoing",
      icon: CalendarDays,
    },
    {
      title: "Pending Requests",
      value: "—",
      description: "Waiting for confirmation",
      icon: Clock3,
    },
    {
      title: "Rental Overview",
      value: "—",
      description: "Your overall performance",
      icon: TrendingUp,
    },
  ];

  return (
    <SidebarInset className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
        <SidebarTrigger />

        <Separator orientation="vertical" className="h-5" />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Dashboard
          </p>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Manage your EquipRent workspace
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-xs font-medium capitalize text-muted-foreground">
            {role}
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-6 lg:p-8">
        {/* Welcome section */}
        <section className="glass-card relative overflow-hidden rounded-2xl p-6 md:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-brand/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-brand">
                Welcome back
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Hello, {user.name.split(" ")[0]}!
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Welcome to your EquipRent dashboard. Manage your equipment,
                rentals, and activities from one place.
              </p>
            </div>

            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <TrendingUp className="size-7" />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Overview
            </h2>

            <p className="text-sm text-muted-foreground">
              A quick look at your workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card
                  key={stat.title}
                  className="glass-card border-border/70 shadow-none transition-all hover:-translate-y-1 hover:border-brand/30"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>

                    <div className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="size-4" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Recent activity */}
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="glass-card border-border/70 shadow-none lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    Recent Activities
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Keep track of your latest activities.
                  </p>
                </div>

                <ArrowUpRight className="size-5 text-muted-foreground" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/20 px-4 text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Package className="size-5" />
                </div>

                <p className="text-sm font-semibold text-foreground">
                  No recent activities
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                  Your recent rental activities will appear here once you
                  start using EquipRent.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">
                Account Information
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Your account details.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Full name
                </p>

                <p className="mt-1 break-words text-sm font-medium text-foreground">
                  {user.name}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground">
                  Email address
                </p>

                <p className="mt-1 break-all text-sm font-medium text-foreground">
                  {user.email}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground">
                  Account role
                </p>

                <p className="mt-1 text-sm font-medium capitalize text-foreground">
                  {role}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </SidebarInset>
  );
};

export default Dashboard;
