"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Link } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteAuthorButton from "../buttons/DeleteAuthorButton";
import { Badge } from "@/components/ui/badge";
import { IAuthor } from "@/database/author.model";

interface IAuthorTable {
  _id: string;
  authorId: string;
  name: string;
  bio: string;
  image: string;
  coverImage?: string;
  birthDate?: string;
  deathDate?: string;
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "genres",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genres
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
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
  },
  {
    accessorKey: "books",
    header: "Books",
    cell: ({ row }) => {
      return new Date(row.getValue("books"));
    },
  },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => {
      const featured = row.getValue("featured");
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
    cell: ({ row }) => {
      const author = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button className="cursor-pointer" variant="ghost" size="sm">
              Actions
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
