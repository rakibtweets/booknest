"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import DeleteAuthorButton from "@/components/buttons/DeleteAuthorButton";
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

import { DataTableColumnHeader } from "../data-table-column-header";

interface IAuthorTable {
  _id: string;
  authorId: string;
  name: string;
  bio: string;
  image: string;
  coverImage?: string;
  birthDate?: Date;
  deathDate?: Date;
  birthPlace?: string;
  website?: string;
  email?: string;
  genres: string[];
  booksCount?: number;
  awards?: string[];
  featured: boolean;
}

export const authorsColumns: ColumnDef<IAuthorTable>[] = [
  {
    accessorKey: "index",
    header: "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      const author = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author.name}</div>
          </div>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "genres",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genres" />
    ),
    cell: ({ row }) => {
      const genres = row.getValue("genres") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      );
    },
    enableGlobalFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const genres = row.getValue(columnId) as string[];
      return genres.some((genre) =>
        genre.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  },
  {
    accessorKey: "books",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Books" />
    ),
    cell: ({ row }) => {
      const booksCount = row.original.booksCount;
      return (
        <div className="flex flex-wrap gap-1">
          {booksCount ? (
            <Badge variant="outline" className="text-xs">
              {booksCount}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              0
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
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
      const author = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button className="cursor-pointer" variant="ghost" size="sm">
              <span className="sr-only">Open Actions</span>
              <MoreHorizontal className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/authors/${author._id}`}>View Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/authors/${author._id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DeleteAuthorButton authorId={author._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
