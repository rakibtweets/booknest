import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthors } from "@/lib/actions/author-actions";
import DeleteAuthorButton from "@/components/buttons/DeleteAuthorButton";

export const metadata: Metadata = {
  title: "Manage Authors - BookNext Admin",
  description: "Manage authors in the BookNext store",
};

// Mock authors data - in a real app, this would come from the database
// const authors = [
//   {
//     id: "stephen-king",
//     name: "Stephen King",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.",
//     booksCount: 64,
//     genres: ["Horror", "Thriller", "Science Fiction"],
//     featured: true,
//   },
//   {
//     id: "jk-rowling",
//     name: "J.K. Rowling",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Joanne Rowling, better known by her pen name J. K. Rowling, is a British author and philanthropist.",
//     booksCount: 14,
//     genres: ["Fantasy", "Children's Fiction", "Mystery"],
//     featured: true,
//   },
//   {
//     id: "james-patterson",
//     name: "James Patterson",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "James Brendan Patterson is an American author and philanthropist. Among his works are the Alex Cross, Michael Bennett, Women's Murder Club, and Maximum Ride series.",
//     booksCount: 114,
//     genres: ["Thriller", "Mystery", "Crime Fiction"],
//     featured: true,
//   },
//   {
//     id: "colleen-hoover",
//     name: "Colleen Hoover",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Colleen Hoover is an American author who primarily writes novels in the romance and young adult fiction genres.",
//     booksCount: 22,
//     genres: ["Romance", "Young Adult", "Contemporary"],
//     featured: true,
//   },
//   {
//     id: "haruki-murakami",
//     name: "Haruki Murakami",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan and internationally.",
//     booksCount: 28,
//     genres: ["Literary Fiction", "Magical Realism", "Surrealism"],
//     featured: true,
//   },
//   {
//     id: "toni-morrison",
//     name: "Toni Morrison",
//     image: "/placeholder.svg?height=200&width=200",
//     bio: "Toni Morrison was an American novelist, essayist, book editor, and college professor. Her first novel, The Bluest Eye, was published in 1970.",
//     booksCount: 11,
//     genres: ["Literary Fiction", "Historical Fiction"],
//     featured: true,
//   },
// ];

export default async function AdminAuthorsPage() {
  const result = await getAuthors();
  const authors = result.data?.authors || [];
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Authors
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and manage authors in your store
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/authors/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Author
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search authors..."
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="text-sm border rounded-md px-2 py-1 w-full sm:w-auto">
              <option>All Genres</option>
              <option>Horror</option>
              <option>Fantasy</option>
              <option>Thriller</option>
              <option>Romance</option>
              <option>Literary Fiction</option>
            </select>
            <select className="text-sm border rounded-md px-2 py-1 w-full sm:w-auto">
              <option>All Authors</option>
              <option>Featured Only</option>
              <option>Non-Featured</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Genres</TableHead>
              <TableHead>Books</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>
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
                      <div className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                        {author.bio}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {author.genres.map((genre) => (
                      <Badge key={genre} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{author.booksCount}</TableCell>
                <TableCell>
                  {author.featured ? (
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
                        <Link href={`/authors/${author._id}`}>
                          View Profile
                        </Link>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>6</strong> of <strong>6</strong>{" "}
          authors
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
