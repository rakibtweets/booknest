"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import DeletePublisherButton from "@/components/buttons/DeletePublisherButton";
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
import { IPublisher } from "@/database/publisher.model";

import { DataTableColumnHeader } from "../data-table-column-header";

export const publisherColumns: ColumnDef<IPublisher>[] = [
  {
    accessorKey: "index",
    header: "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publisher" />
    ),
    cell: ({ row }) => {
      const publisher = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={publisher.logo} alt={publisher.name} />
            <AvatarFallback>
              {publisher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{publisher.name}</div>
          </div>
        </div>
      );
    },
    enableGlobalFilter: true,
    enableHiding: false,
  },
  {
    accessorKey: "founded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Founded" />
    ),
    cell: ({ row }) => {
      const publisher = row.original;
      return <Badge className="w-fit">{publisher.founded || "N/A"}</Badge>;
    },
  },
  {
    accessorKey: "headquarters",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Headquarters" />
    ),
    cell: ({ row }) => {
      const publisher = row.original;
      return (
        <div>
          {publisher.headquarters ? (
            <span className="text-sm">{publisher.headquarters}</span>
          ) : (
            <span className="text-sm text-muted-foreground">N/A</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "featured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => {
      const featured = row.original.featured;
      return (
        <>
          {featured ? (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Featured
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              Standard
            </span>
          )}
        </>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const publisher = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
              <MoreHorizontal className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/publishers/${publisher._id}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/publishers/${publisher._id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DeletePublisherButton publisherId={publisher._id as string} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
