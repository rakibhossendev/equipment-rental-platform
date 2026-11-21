import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import {
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
  Users,
  CheckCircle2,
  AlertCircle,
  DollarSign,
} from "lucide-react";

import { dashboardMenuItem } from "./data/menu-data";
import { getDashboardAnalytics } from "@/lib/action/analytics/get-analytics";
import {
  AreaChartComponent,
  BarChartComponent,
  DonutChartComponent,
} from "@/components/charts/DashboardCharts";

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

  const analytics = await getDashboardAnalytics();

  let stats: {
    title: string;
    value: string | number;
    description: string;
    icon: typeof Package;
  }[] = [];

  let highlightLabel = "";
  let highlightValue = "";

  if (role === "admin") {
    stats = [
      {
        title: "Total Users",
        value: analytics ? (analytics.overview.totalUsers ?? 0) : "—",
        description: "Registered platform accounts",
        icon: Users,
      },
      {
        title: "Total Equipment",
        value: analytics ? (analytics.overview.totalEquipment ?? 0) : "—",
        description: "All equipment listings",
        icon: Package,
      },
      {
        title: "Total Bookings",
        value: analytics ? (analytics.overview.totalBookings ?? 0) : "—",
        description: "All rental reservations",
        icon: CalendarDays,
      },
      {
        title: "Pending Approvals",
        value: analytics ? (analytics.overview.pendingApprovals ?? 0) : "—",
        description: "Equipment awaiting review",
        icon: Clock3,
      },
    ];

    if (analytics) {
      highlightLabel = "Total Platform Revenue";
      highlightValue = `৳${(analytics.overview.totalRevenue ?? 0).toLocaleString()}`;
    }
  } else if (role === "owner") {
    stats = [
      {
        title: "Total Equipment",
        value: analytics ? (analytics.overview.totalEquipment ?? 0) : "—",
        description: "Your equipment listings",
        icon: Package,
      },
      {
        title: "Approved Equipment",
        value: analytics ? (analytics.overview.approvedEquipment ?? 0) : "—",
        description: "Live and ready for rent",
        icon: CheckCircle2,
      },
      {
        title: "Pending Equipment",
        value: analytics ? (analytics.overview.pendingEquipment ?? 0) : "—",
        description: "Awaiting admin review",
        icon: Clock3,
      },
      {
        title: "Rentals Received",
        value: analytics ? (analytics.overview.totalRentalsReceived ?? 0) : "—",
        description: "Customer bookings for your items",
        icon: TrendingUp,
      },
    ];

    if (analytics) {
      highlightLabel = "Total Confirmed Earnings";
      highlightValue = `৳${(analytics.overview.totalEarnings ?? 0).toLocaleString()}`;
    }
  } else {
    // Customer
    stats = [
      {
        title: "Total Rentals",
        value: analytics ? (analytics.overview.totalRentals ?? 0) : "—",
        description: "Your rental activities",
        icon: Package,
      },
      {
        title: "Active Bookings",
        value: analytics ? (analytics.overview.activeBookings ?? 0) : "—",
        description: "Currently ongoing rentals",
        icon: CalendarDays,
      },
      {
        title: "Pending Requests",
        value: analytics ? (analytics.overview.pendingBookings ?? 0) : "—",
        description: "Waiting for confirmation",
        icon: Clock3,
      },
      {
        title: "Completed Rentals",
        value: analytics ? (analytics.overview.completedRentals ?? 0) : "—",
        description: "Successfully returned",
        icon: CheckCircle2,
      },
    ];

    if (analytics) {
      highlightLabel = "Total Amount Paid";
      highlightValue = `৳${(analytics.overview.totalPaid ?? 0).toLocaleString()}`;
    }
  }

  return (
    <div className="min-h-screen bg-background">
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

            {highlightLabel && highlightValue ? (
              <div className="flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <DollarSign className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {highlightLabel}
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {highlightValue}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <TrendingUp className="size-7" />
              </div>
            )}
          </div>
        </section>

        {!analytics && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
            <AlertCircle className="size-5 shrink-0" />
            <p className="text-sm">
              Live statistics are currently synchronizing. Showing cached values where available.
            </p>
          </div>
        )}

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
                      {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
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

        {/* Challenge 3: Admin Visualizations */}
        {role === "admin" && analytics?.charts && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Platform Analytics &amp; Visualizations
              </h2>
              <p className="text-sm text-muted-foreground">
                Revenue trends, monthly booking volume, and equipment distribution across the platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <AreaChartComponent
                title="Monthly Revenue"
                description="Total platform revenue from paid bookings (last 6 months)"
                data={(analytics.charts.monthlyRevenue || []).map((m) => ({
                  label: m.month,
                  value: m.revenue,
                }))}
                valuePrefix="৳"
                color="#f59e0b"
              />

              <BarChartComponent
                title="Monthly Bookings"
                description="Number of rental bookings created per month"
                data={(analytics.charts.monthlyBookings || []).map((m) => ({
                  label: m.month,
                  value: m.bookings,
                }))}
                valueSuffix="Bookings"
                barColor="#3b82f6"
              />

              <DonutChartComponent
                title="Equipment by Category"
                description="Total listed equipment categorized by type"
                data={(analytics.charts.categoryDistribution || []).map((c) => ({
                  label: c.category || "Other",
                  value: c.count,
                }))}
              />

              <BarChartComponent
                title="Equipment Approval Status"
                description="Breakdown of equipment by moderation status"
                data={(analytics.charts.statusDistribution || []).map((s) => ({
                  label: s.status || "Unknown",
                  value: s.count,
                }))}
                valueSuffix="Items"
                barColor="#10b981"
              />
            </div>
          </section>
        )}

        {/* Challenge 3: Owner Visualizations */}
        {role === "owner" && analytics?.charts && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Rental Performance &amp; Earnings
              </h2>
              <p className="text-sm text-muted-foreground">
                Track your rental income and bookings received for your equipment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <AreaChartComponent
                title="Monthly Earnings"
                description="Your earnings from completed paid rentals"
                data={(analytics.charts.monthlyEarnings || []).map((m) => ({
                  label: m.month,
                  value: m.earnings,
                }))}
                valuePrefix="৳"
                color="#10b981"
              />

              <BarChartComponent
                title="Monthly Rental Bookings"
                description="Total rental bookings received for your equipment"
                data={(analytics.charts.monthlyRentals || []).map((m) => ({
                  label: m.month,
                  value: m.bookings,
                }))}
                valueSuffix="Rentals"
                barColor="#f59e0b"
              />

              <div className="md:col-span-2 lg:max-w-xl">
                <DonutChartComponent
                  title="Equipment Approval Status"
                  description="Review status of your equipment inventory"
                  data={(analytics.charts.statusDistribution || []).map((s) => ({
                    label: s.status || "Unknown",
                    value: s.count,
                  }))}
                />
              </div>
            </div>
          </section>
        )}

        {/* Account Info and Activity */}
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
    </div>
  );
};

export default Dashboard;
