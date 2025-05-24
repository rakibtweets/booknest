"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/database/user.model";

import { DataTableColumnHeader } from "../data-table-column-header";

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "index",
    header: "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Users" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              width={10}
              height={10}
              src={user.picture}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
    enableGlobalFilter: true,
    enableHiding: false,
    filterFn: (row, columnId, filterValue) => {
      const name = row.original.name.toLowerCase();
      const email = row.original.email.toLowerCase();
      const search = filterValue.toLowerCase();
      return name.includes(search) || email.includes(search);
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role) => (
            <Badge
              key={role}
              variant={role === "admin" ? "secondary" : "default"}
              className="text-xs"
            >
              {role}
            </Badge>
          ))}
        </div>
      );
    },
    enableGlobalFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const roles = row.getValue(columnId) as string[];
      return roles.some((role) =>
        role.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  },
  {
    accessorKey: "orders",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Orders" />
    ),
    cell: ({ row }) => {
      const orders = row.original.orders ? row.original.orders.length : 0; // Ensure orders is a number
      return (
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {orders}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <>
          {status === "active" ? (
            <Badge
              variant="default"
              className="text-xs bg-green-100 text-green-800"
            >
              Active
            </Badge>
          ) : status === "inactive" ? (
            <Badge variant="secondary" className="text-xs">
              Inactive
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Suspended
            </Badge>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JoinedAt" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return <div>{new Date(user.createdAt).toLocaleDateString()}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/users/${user._id}`}>View Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/users/${user._id}/edit`}>Edit User</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/users/${user._id}/orders`}>View Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.status === "active" ? (
              <DropdownMenuItem>Deactivate User</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>Activate User</DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600">
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
