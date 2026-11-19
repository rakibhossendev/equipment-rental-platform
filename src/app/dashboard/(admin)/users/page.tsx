
import { getUsers } from "@/lib/action/users/getUser";
import {
  Users,
  UserRound,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";
import type { UserType } from "../../../../../typescript/main";
import UsersTable from "../../_components/user/UsersTable";

export default async function UsersPage() {
  let users: UserType[] = [];
  let error = false;

  try {
    users = await getUsers();
  } catch (err) {
    console.error("Users fetching error:", err);
    error = true;
  }

  const totalUsers = users.length;
  const totalOwners = users.filter(
    (user) => user.role === "owner"
  ).length;
  const totalCustomers = users.filter(
    (user) => user.role === "customer"
  ).length;
  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All registered accounts",
      icon: Users,
      color: "text-brand",
      bg: "bg-brand/10",
    },
    {
      title: "Total Owners",
      value: totalOwners,
      description: "Equipment providers",
      icon: BriefcaseBusiness,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      description: "Equipment renters",
      icon: UserRound,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total Admins",
      value: totalAdmins,
      description: "Platform administrators",
      icon: ShieldCheck,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          User Management
        </h1>

        <p className="text-sm text-muted-foreground">
          Monitor registered accounts and manage platform user roles.
        </p>
      </div>

      {/* Statistics */}
      {!error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                  {stat.value.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Users Table */}
      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-10 text-center">
          <h2 className="font-semibold text-foreground">
            Failed to load users
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong while fetching user information.
            Please refresh the page and try again.
          </p>
        </div>
      ) : (
        <UsersTable users={users} />
      )}
    </main>
  );
}
