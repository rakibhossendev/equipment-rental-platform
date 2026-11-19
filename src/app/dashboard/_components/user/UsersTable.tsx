
"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserType } from "../../../../../typescript/main";
import UsersSearch from "./UserSearch";
import { updateUserRole } from "@/lib/action/users/updateUserRole";
import { toast } from "sonner";

type UserRole = "customer" | "owner" | "admin";

interface UsersTableProps {
  users: UserType[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[ 0 ])
    .join("")
    .toUpperCase();
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export default function UsersTable({ users }: UsersTableProps) {
  const [ search, setSearch ] = useState("");

  const [ roles, setRoles ] = useState<Record<string, UserRole>>(() =>
    Object.fromEntries(
      users.map((user) => [ user._id, user.role as UserRole ])
    )
  );

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );
  }, [ users, search ]);

  const handleRoleChange = async (userId: string,role: UserRole) => {
    try {
      const data = await updateUserRole(userId, role);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setRoles((previous) => ({
        ...previous,
        [ userId ]: role,
      }));

      toast.success(data.message);
    } catch (error) {
      console.error("Role update error:", error);
      toast.error("Failed to update user role.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Results */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UsersSearch value={search} onChange={setSearch} />

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredUsers.length}
          </span>{" "}
          of {users.length} users
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-foreground">All Users</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View registered users and manage their roles.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="min-w-[220px] pl-5">User</TableHead>
                <TableHead className="min-w-[220px]">Email</TableHead>
                <TableHead className="min-w-[160px]">Role</TableHead>
                <TableHead className="min-w-[150px]">Registration Date</TableHead>
                <TableHead className="min-w-[120px] pr-5 text-right">
                  Account
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const role = roles[ user._id ] ?? user.role;

                  return (
                    <TableRow key={user._id}>
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10 border border-border">
                            <AvatarImage
                              src={user.image || undefined}
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-secondary text-xs font-semibold">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>

                          <span className="font-medium text-foreground">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {user.email}
                      </TableCell>

                      <TableCell>
                        <Select
                          value={role}
                          onValueChange={(value) =>
                            handleRoleChange(user._id, value as UserRole)
                          }
                        >
                          <SelectTrigger className="h-9 w-[135px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>

                      <TableCell className="pr-5 text-right">
                        <Badge
                          variant="outline"
                          className="capitalize"
                        >
                          {role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <p className="font-medium text-foreground">
                      No users found
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try searching with another name or email.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-border px-5 py-3 sm:px-6">
          <p className="text-xs text-muted-foreground">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"} displayed
          </p>
        </div>
      </div>
    </div>
  );
}
