import {
  ArrowLeft,
  Edit,
  Trash2,
  Globe,
  Mail,
  Twitter,
  BookOpen,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Author Details - BookNext Admin",
  description: "View and manage author details",
};

// Mock authors data - in a real app, this would come from the database
const authors = [
  {
    id: "stephen-king",
    name: "Stephen King",
    image: "https://placehold.co/400x400",
    coverImage: "https://placehold.co/400x1200",
    bio: "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. His books have sold more than 350 million copies, and many have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections.",
    birthDate: "September 21, 1947",
    birthPlace: "Portland, Maine, USA",
    website: "https://stephenking.com",
    email: "contact@stephenking.com",
    twitter: "@StephenKing",
    booksCount: 64,
    genres: [
      "Horror",
      "Thriller",
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Supernatural Fiction",
    ],
    awards: [
      "Bram Stoker Award",
      "World Fantasy Award",
      "British Fantasy Society Award",
      "National Medal of Arts",
    ],
    featured: true,
    books: [
      {
        id: "the-shining",
        title: "The Shining",
        coverImage: "https://placehold.co/400x300",
        publishYear: 1977,
        genre: "Horror",
        rating: 4.2,
        price: 14.99,
      },
      {
        id: "it",
        title: "It",
        coverImage: "https://placehold.co/400x300",
        publishYear: 1986,
        genre: "Horror",
        rating: 4.3,
        price: 16.99,
      },
      {
        id: "the-stand",
        title: "The Stand",
        coverImage: "https://placehold.co/400x300",
        publishYear: 1978,
        genre: "Horror",
        rating: 4.5,
        price: 15.99,
      },
      {
        id: "misery",
        title: "Misery",
        coverImage: "https://placehold.co/400x300",
        publishYear: 1987,
        genre: "Thriller",
        rating: 4.1,
        price: 13.99,
      },
    ],
  },
  // Other authors would be defined here
];

interface AuthorDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function AuthorDetailsPage({
  params,
}: AuthorDetailsPageProps) {
  // Find the author by ID
  const { id } = await params;
  const author = authors.find((a) => a.id === id);

  // If author not found, return 404
  if (!author) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/authors"
          className="flex items-center text-sm hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to authors
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/authors/${author.id}`}>View Public Page</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/admin/authors/${author.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Author
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Author
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback>
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{author.name}</CardTitle>
                    <CardDescription>Author ID: {author.id}</CardDescription>
                  </div>
                  {author.featured && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {author.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="books">Books</TabsTrigger>
                  <TabsTrigger value="awards">Awards</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-semibold mb-2">Biography</h3>
                    <p className="text-sm">{author.bio}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Personal Information
                      </h3>
                      <dl className="space-y-2">
                        <div className="flex">
                          <dt className="w-32 font-medium text-sm">
                            Birth Date:
                          </dt>
                          <dd className="text-sm">{author.birthDate}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium text-sm">
                            Birth Place:
                          </dt>
                          <dd className="text-sm">{author.birthPlace}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-32 font-medium text-sm">
                            Books Count:
                          </dt>
                          <dd className="text-sm">{author.booksCount}</dd>
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
                              href={author.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {author.website.replace(/^https?:\/\//, "")}
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
                              href={`mailto:${author.email}`}
                              className="text-primary hover:underline"
                            >
                              {author.email}
                            </a>
                          </dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="w-32 font-medium text-sm flex items-center">
                            <Twitter className="h-4 w-4 mr-2 text-muted-foreground" />
                            Twitter:
                          </dt>
                          <dd className="text-sm">
                            <a
                              href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {author.twitter}
                            </a>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="books" className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {author.books.map((book) => (
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
                            {book.publishYear}
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
                      <Link href={`/admin/books?author=${author.id}`}>
                        View All Books by {author.name}
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="awards" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Awards & Recognition</h3>
                    <ul className="space-y-2">
                      {author.awards.map((award) => (
                        <li key={award} className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            Award
                          </Badge>
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Author Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Books</span>
                  <span className="font-medium">{author.booksCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Genres</span>
                  <span className="font-medium">{author.genres.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-medium">
                    {(
                      author.books.reduce((sum, book) => sum + book.rating, 0) /
                      author.books.length
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Latest Book</span>
                  <span className="font-medium">
                    {
                      author.books.sort(
                        (a, b) => b.publishYear - a.publishYear
                      )[0].publishYear
                    }
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
                <Link href={`/admin/books/add?author=${author.id}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Book for this Author
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/admin/authors/${author.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Author
                </Link>
              </Button>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Author
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
