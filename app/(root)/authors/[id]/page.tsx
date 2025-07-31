import { ArrowLeft, Calendar, Globe, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IBook } from "@/database/book.model";
import { getAuthorById } from "@/lib/actions/author-actions";
import { getBooksByAuthorId } from "@/lib/actions/book-actions";
import { getYear } from "@/lib/utils";
import { Author } from "@/types/global";

interface AuthorPageProps {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export async function generateMetadata({ params }: AuthorPageProps): Metadata {
  const { id } = await params;
  const authorResult = await getAuthorById(id);
  const author = (authorResult?.data?.author as Author) || {};

  if (!author) {
    return {
      title: "Author Not Found - BookNext",
      description: "The requested author could not be found",
    };
  }

  return {
    title: `${author?.name} - BookNext`,
    description: `Explore books by ${author?.name} - ${author?.bio?.substring(0, 150)}...`,
  };
}

export default async function AuthorDetailsPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const authorResult = await getAuthorById(id);
  const author = (authorResult?.data?.author as Author) || {};
  const authorBookResult = await getBooksByAuthorId({ authorId: id });
  const authorBooks = (authorBookResult.data?.books as IBook[]) || [];

  if (!author) {
    notFound();
  }

  // Group books by genre
  // const booksByGenre = author.books.reduce(
  //   (acc, book) => {
  //     if (!acc[book.genre]) {
  //       acc[book.genre] = [];
  //     }
  //     acc[book.genre].push(book);
  //     return acc;
  //   },
  //   {} as Record<string, typeof author.books>
  // );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/authors"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all authors
      </Link>

      {/* Author Hero */}
      <div className="relative w-full aspect-[3/1] mb-8 rounded-lg overflow-hidden">
        <Image
          src={author?.coverImage || "/placeholder.svg"}
          alt={author?.name || "Image"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center p-6 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4 border-white">
              <AvatarImage src={author?.image} alt={author?.name} />
              <AvatarFallback>{author?.name?.charAt(0) ?? ""}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {author.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {author?.genres?.slice(0, 3)?.map((genre: string) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    {genre}
                  </Badge>
                ))}
                {author?.genres?.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    +{author?.genres?.length - 3} more
                  </Badge>
                )}
              </div>
              <p className="text-white/80 max-w-2xl text-sm md:text-base line-clamp-3 md:line-clamp-none">
                {author?.bio?.split(".")[0]}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="books" className="mb-12">
            <TabsList>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="genres">Genres</TabsTrigger>
            </TabsList>

            <TabsContent value="books" className="py-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Books by {author.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Sort by:
                  </span>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Rating</option>
                    <option>Title</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {authorBooks?.map((book: IBook) => (
                  <Link
                    key={book?._id as string}
                    href={`/books/${book?._id}`}
                    className="group"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                      <Image
                        src={book?.coverImage || "/placeholder.svg"}
                        alt={book?.title || ""}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                        {book?.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor((book?.rating as number) || 0)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : i < (book?.rating ?? 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 fill-gray-300"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          {book?.rating?.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground">
                          {getYear(book?.publishDate?.toString())}
                        </p>
                        <p className="font-bold">${book?.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href={`/books?author=${author?._id}`}>
                    View All Books by {author?.name}
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="about" className="py-4">
              <h2 className="text-2xl font-bold mb-6">About {author?.name}</h2>
              <div className="space-y-6">
                <p className="text-base">{author?.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Personal Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Birth Date</p>
                          <p className="text-sm text-muted-foreground">
                            {getYear(author?.birthDate ?? "") || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Birth Place</p>
                          <p className="text-sm text-muted-foreground">
                            {author?.birthPlace}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a
                            href={author?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {author?.website?.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href={`mailto:${author?.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {author?.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Awards & Recognition
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {author?.awards?.map((award: string) => (
                      <li key={award} className="text-sm">
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="genres" className="py-4">
              <h2 className="text-2xl font-bold mb-6">
                {author.name}&apos;s Genres
              </h2>

              {/* {Object.entries(booksByGenre)?.map(([genre, books]) => (
                <div key={genre} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{genre}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.map((book) => (
                      <Link
                        key={book.id}
                        href={`/books/${book.id}`}
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
                            {book?.publishDate}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))} */}

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">All Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {author.genres?.map((genre) => (
                    <Link
                      key={genre}
                      href={`/books?cat=${genre.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-4 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Author Statistics</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Books</span>
                  <span className="font-medium">{author.booksCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Genres</span>
                  <span className="font-medium">{author.genres?.length}</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-medium">
                    {(
                      author.books.reduce((sum, book) => sum + book.rating, 0) /
                      author.books?.length
                    ).toFixed(1)}
                  </span>
                </div> */}
                {/* <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Latest Book</span>
                  <span className="font-medium">
                    {
                      author.books.sort(
                        (a, b) => b.publishYear - a.publishYear
                      )[0].publishYear
                    }
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Related Authors</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {author.relatedAuthors.map((relatedAuthor) => (
                  <Link
                    key={relatedAuthor.id}
                    href={`/authors/${relatedAuthor.id}`}
                    className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                  >
                    <Avatar>
                      <AvatarImage
                        src={relatedAuthor.image}
                        alt={relatedAuthor.name}
                      />
                      <AvatarFallback>
                        {relatedAuthor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{relatedAuthor.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div> */}

          {/* <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Popular Books</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {author.books
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                    >
                      <div className="relative aspect-[2/3] h-16 w-10">
                        <Image
                          src={book.coverImage || "/placeholder.svg"}
                          alt={book.title}
                          fill
                          className="object-cover rounded"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-1">
                          {book.title}
                        </h4>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(book.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 fill-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">
                            {book.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/books?author=${author.id}`}>
                    View All Books
                  </Link>
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
