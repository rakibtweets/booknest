import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { publisherColumns } from "@/components/tables/publisher-table/publisher-column";
import PublisherTable from "@/components/tables/publisher-table/publisher-table";
import { Button } from "@/components/ui/button";
import { getPublishers } from "@/lib/actions/publisher-actions";

export const metadata: Metadata = {
  title: "Manage Publishers - BookNext Admin",
  description: "Manage publishers in the BookNext store",
};

// Mock publishers data - in a real app, this would come from the database
// const publishers = [
//   {
//     id: "penguin-random-house",
//     name: "Penguin Random House",
//     logo: "https://placehold.co/120x80",
//     description:
//       "Penguin Random House is the international home to nearly 250 editorially and creatively independent publishing imprints.",
//     founded: 2013,
//     headquarters: "New York, NY",
//     booksCount: 1245,
//     featured: true,
//   },
//   {
//     id: "hachette-book-group",
//     name: "Hachette Book Group",
//     logo: "https://placehold.co/120x80",
//     description:
//       "Hachette Book Group (HBG) is a leading U.S. trade publisher and a division of the third largest trade and educational book publisher in the world.",
//     founded: 2006,
//     headquarters: "New York, NY",
//     booksCount: 876,
//     featured: true,
//   },
//   {
//     id: "harper-collins",
//     name: "HarperCollins",
//     logo: "https://placehold.co/120x80",
//     description:
//       "HarperCollins Publishers is the second-largest consumer book publisher in the world.",
//     founded: 1817,
//     headquarters: "New York, NY",
//     booksCount: 943,
//     featured: true,
//   },
//   {
//     id: "simon-schuster",
//     name: "Simon & Schuster",
//     logo: "https://placehold.co/120x80",
//     description:
//       "Simon & Schuster is a global leader in general interest publishing.",
//     founded: 1924,
//     headquarters: "New York, NY",
//     booksCount: 754,
//     featured: false,
//   },
//   {
//     id: "macmillan-publishers",
//     name: "Macmillan Publishers",
//     logo: "https://placehold.co/120x80",
//     description:
//       "Macmillan Publishers is a global trade book publishing company with prominent imprints around the world.",
//     founded: 1843,
//     headquarters: "New York, NY",
//     booksCount: 632,
//     featured: false,
//   },
//   {
//     id: "scholastic",
//     name: "Scholastic",
//     logo: "https://placehold.co/100x120",
//     description:
//       "Scholastic is the world's largest publisher and distributor of children's books.",
//     founded: 1920,
//     headquarters: "New York, NY",
//     booksCount: 521,
//     featured: true,
//   },
// ];

export default async function AdminPublishersPage() {
  const result = await getPublishers();
  const publishers = result.data?.publishers;
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manage Publishers
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and manage publishers in your store
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/publishers/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Publisher
            </Link>
          </Button>
        </div>
      </div>

      <PublisherTable data={publishers || []} columns={publisherColumns} />
    </>
  );
}
