import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Globe,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Publisher Details - BookNext Admin",
  description: "View and manage publisher details",
};

// Mock publishers data - in a real app, this would come from the database
const publishers = [
  {
    id: "penguin-random-house",
    name: "Penguin Random House",
    logo: "https://placehold.co/100x200",
    description:
      "Penguin Random House is the international home to nearly 250 editorially and creatively independent publishing imprints.",
    longDescription:
      "Penguin Random House is the international home to nearly 250 editorially and creatively independent publishing imprints. Together, our mission is to foster a universal passion for reading by partnering with authors to help create stories and communicate ideas that inform, entertain, and inspire, and to connect them with readers everywhere.\n\nPenguin Random House was formed on July 1, 2013, upon the completion of an agreement between Bertelsmann and Pearson to merge their respective trade publishing companies, Random House and Penguin, with the parent companies owning 53% and 47%, respectively. In December 2019, Penguin Random House entered into an agreement to purchase Penguin Random House LLC, creating the world's largest book publisher.",
    founded: 2013,
    headquarters: "New York, NY",
    website: "https://www.penguinrandomhouse.com",
    email: "consumerservices@penguinrandomhouse.com",
    phone: "+1 (800) 733-3000",
    booksCount: 1245,
    imprints: [
      "Vintage",
      "Knopf",
      "Crown",
      "Viking",
      "Penguin Classics",
      "Random House",
    ],
    featured: true,
    books: [
      {
        id: "1",
        title: "Becoming",
        author: "Michelle Obama",
        coverImage: "https://placehold.co/400x300",
        publishYear: 2018,
        genre: "Biography",
        rating: 4.6,
        price: 18.99,
      },
      {
        id: "2",
        title: "A Game of Thrones",
        author: "George R.R. Martin",
        coverImage: "https://placehold.co/400x300",
        publishYear: 1996,
        genre: "Fantasy",
        rating: 4.7,
        price: 16.99,
      },
      {
        id: "3",
        title: "The Institute",
        author: "Stephen King",
        coverImage: "https://placehold.co/400x300",
        publishYear: 2019,
        genre: "Horror",
        rating: 4.3,
        price: 17.99,
      },
      {
        id: "4",
        title: "The Guardians",
        author: "John Grisham",
        coverImage: "https://placehold.co/400x300",
        publishYear: 2019,
        genre: "Thriller",
        rating: 4.2,
        price: 15.99,
      },
    ],
  },
  // Other publishers would be defined here
];

interface PublisherDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function PublisherDetailsPage({
  params,
}: PublisherDetailsPageProps) {
  const { id } = await params;

  // Find the publisher by ID
  const publisher = publishers.find((p) => p.id === id);

  // If publisher not found, return 404
  if (!publisher) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/publishers"
          className="flex items-center text-sm hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to publishers
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/publishers/${publisher.id}`}>View Public Page</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/admin/publishers/${publisher.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Publisher
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Publisher
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative h-20 w-40">
                <Image
                  src={publisher.logo || "/placeholder.svg"}
                  alt={publisher.name}
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{publisher.name}</CardTitle>
                    <CardDescription>
                      Publisher ID: {publisher.id}
                    </CardDescription>
                  </div>
                  {publisher.featured && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Founded: {publisher.founded}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {publisher.headquarters}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {publisher.booksCount} books
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="books">Books</TabsTrigger>
                  <TabsTrigger value="imprints">Imprints</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm">{publisher.longDescription}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Company Information
                      </h3>
                      <dl className="space-y-2">
                        <div className="flex">
                          <dt className="w-32 font-medium text-sm">Founded:</dt>
                          <dd className="text-sm">{publisher.founded}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium text-sm">
                            Headquarters:
                          </dt>
                          <dd className="text-sm">{publisher.headquarters}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium text-sm">
                            Books Count:
                          </dt>
                          <dd className="text-sm">{publisher.booksCount}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Contact Information
                      </h3>
                      <dl className="space-y-2">
                        <div className="flex items-center">
                          <dt className="w-32 font-medium text-sm flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            Website:
                          </dt>
                          <dd className="text-sm">
                            <a
                              href={publisher.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {publisher.website.replace(/^https?:\/\//, "")}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="w-32 font-medium text-sm flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            Email:
                          </dt>
                          <dd className="text-sm">
                            <a
                              href={`mailto:${publisher.email}`}
                              className="text-primary hover:underline"
                            >
                              {publisher.email}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="w-32 font-medium text-sm flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            Phone:
                          </dt>
                          <dd className="text-sm">
                            <a
                              href={`tel:${publisher.phone}`}
                              className="text-primary hover:underline"
                            >
                              {publisher.phone}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="books" className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {publisher.books.map((book) => (
                      <Link
                        key={book.id}
                        href={`/admin/books/${book.id}`}
                        className="group"
                      >
                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                          <Image
                            src={book.coverImage || "/placeholder.svg"}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {book.author}
                          </p>
                          <p className="font-bold mt-1">
                            ${book.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                      <Link href={`/admin/books?publisher=${publisher.id}`}>
                        View All Books by {publisher.name}
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="imprints" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Imprints</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {publisher.imprints.map((imprint) => (
                        <div
                          key={imprint}
                          className="border rounded-lg p-4 hover:border-primary transition-colors"
                        >
                          <h4 className="font-medium">{imprint}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            <Link
                              href={`/admin/books?imprint=${imprint.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-primary hover:underline"
                            >
                              View books
                            </Link>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publisher Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Books</span>
                  <span className="font-medium">{publisher.booksCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Imprints</span>
                  <span className="font-medium">
                    {publisher.imprints.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-medium">
                    {(
                      publisher.books.reduce(
                        (sum, book) => sum + book.rating,
                        0
                      ) / publisher.books.length
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Years Active</span>
                  <span className="font-medium">
                    {new Date().getFullYear() - publisher.founded}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href={`/admin/books/add?publisher=${publisher.id}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Book for this Publisher
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/admin/publishers/${publisher.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Publisher
                </Link>
              </Button>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Publisher
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
