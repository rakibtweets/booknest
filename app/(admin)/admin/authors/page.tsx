/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlusCircle, Search, Edit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { authorsColumns } from "@/components/tables/author-table/author-column";
import AuthorsTable from "@/components/tables/author-table/author-table";
import { Button } from "@/components/ui/button";
import { getAuthors } from "@/lib/actions/author-actions";

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
  const result = await getAuthors({});
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
      </div>

      <AuthorsTable data={authors} columns={authorsColumns} />
    </>
  );
}
