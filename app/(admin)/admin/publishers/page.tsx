import { PlusCircle, Search, Edit, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import DeletePublisherButton from "@/components/buttons/DeletePublisherButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPublisher } from "@/database/publisher.model";
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search publishers..."
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="text-sm border rounded-md px-2 py-1 w-full sm:w-auto">
              <option>All Publishers</option>
              <option>Featured Only</option>
              <option>Non-Featured</option>
            </select>
            <select className="text-sm border rounded-md px-2 py-1 w-full sm:w-auto">
              <option>Sort by Name</option>
              <option>Sort by Founded (Oldest)</option>
              <option>Sort by Founded (Newest)</option>
              <option>Sort by Books Count</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher</TableHead>
              <TableHead>Founded</TableHead>
              <TableHead>Headquarters</TableHead>
              {/* <TableHead>Books</TableHead> */}
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publishers?.map((publisher: IPublisher) => (
              <TableRow key={publisher._id as string}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-20">
                      <Image
                        src={publisher.logo || "/placeholder.svg"}
                        alt={publisher.name}
                        fill
                        className="object-contain object-left"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{publisher.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                        {publisher.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{publisher.founded}</TableCell>
                <TableCell>{publisher.headquarters}</TableCell>
                {/* <TableCell>{publisher?.booksCount || 0}</TableCell> */}
                <TableCell>
                  {publisher.featured ? (
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
                      <DeletePublisherButton
                        publisherId={publisher._id as string}
                      />
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
          publishers
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
