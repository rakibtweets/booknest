import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Search, Edit, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteBookButton from "@/components/buttons/DeleteBookButton";
import { getBooks } from "@/lib/actions/book-actions";
import { Badge } from "@/components/ui/badge";
import { IBook } from "@/database/book.model";

export const metadata: Metadata = {
  title: "Manage Books - BookNext Admin",
  description: "Manage books in the BookNext store",
};

export default async function AdminBooksPage() {
  const result = await getBooks({});
  const books = result?.data?.books || [];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Books</h1>
            <p className="text-muted-foreground">
              Add, edit, and manage books in your store
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/books/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Book
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="text-sm border rounded-md px-2 py-1 w-full sm:w-auto">
              <option>All Categories</option>
              <option>Fiction</option>
              <option>Science Fiction</option>
              <option>Fantasy</option>
              <option>Historical Fiction</option>
            </select>
            <select className="text-sm border rounded-md px-2 py-1 w-full sm:w-auto">
              <option>All Publishers</option>
              <option>Penguin Random House</option>
              <option>Knopf</option>
              <option>Tor Books</option>
              <option>Ballantine Books</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.success ? (
              books?.map((book: IBook) => (
                <TableRow key={book._id as string}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-[2/3] h-12 w-8">
                        <Image
                          src={book.coverImage || "/placeholder.svg"}
                          alt={book.title}
                          fill
                          className="object-cover rounded"
                          sizes="32px"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-xs text-muted-foreground">
                          ISBN: {book.isbn}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {
                      //@ts-ignore
                      book.author?.name
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {book.categories?.map((item) => (
                        <Badge key={item} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${book.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {/* // !Todo: Add low stock alert */}
                      {book.stock ? (
                        <>
                          <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
                          <span className="text-orange-500">{book.stock}</span>
                        </>
                      ) : (
                        <span>{book.stock}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {book.featured ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        Standard
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/books/${book._id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/books/${book._id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DeleteBookButton bookId={book._id as string} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {"No books found"}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>8</strong> of <strong>8</strong>{" "}
          books
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
