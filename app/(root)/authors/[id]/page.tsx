import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAuthorById } from "@/lib/actions/author-actions";
import { Author } from "@/types/global";
import { IBook } from "@/database/book.model";
import { getBooksByAuthorId } from "@/lib/actions/book-actions";
import { getYear } from "@/lib/utils";

// This would typically come from a database or API
// const authors = [
//   {
//     id: "stephen-king",
//     name: "Stephen King",
//     image: "https://placehold.co/400x400?text=Author",
//     coverImage: "https://placehold.co/400x1200?text=Cover",
//     bio: "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. His books have sold more than 350 million copies, and many have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections.",
//     birthDate: "September 21, 1947",
//     birthPlace: "Portland, Maine, USA",
//     website: "https://stephenking.com",
//     email: "contact@stephenking.com",
//     twitter: "@StephenKing",
//     booksCount: 64,
//     genres: [
//       "Horror",
//       "Thriller",
//       "Science Fiction",
//       "Fantasy",
//       "Mystery",
//       "Supernatural Fiction",
//     ],
//     awards: [
//       "Bram Stoker Award",
//       "World Fantasy Award",
//       "British Fantasy Society Award",
//       "National Medal of Arts",
//     ],
//     books: [
//       {
//         id: "the-shining",
//         title: "The Shining",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1977,
//         genre: "Horror",
//         rating: 4.2,
//         price: 14.99,
//       },
//       {
//         id: "it",
//         title: "It",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1986,
//         genre: "Horror",
//         rating: 4.3,
//         price: 16.99,
//       },
//       {
//         id: "the-stand",
//         title: "The Stand",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1978,
//         genre: "Horror",
//         rating: 4.5,
//         price: 15.99,
//       },
//       {
//         id: "misery",
//         title: "Misery",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1987,
//         genre: "Thriller",
//         rating: 4.1,
//         price: 13.99,
//       },
//       {
//         id: "pet-sematary",
//         title: "Pet Sematary",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1983,
//         genre: "Horror",
//         rating: 4.0,
//         price: 12.99,
//       },
//       {
//         id: "the-green-mile",
//         title: "The Green Mile",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1996,
//         genre: "Fantasy",
//         rating: 4.6,
//         price: 14.99,
//       },
//     ],
//     relatedAuthors: [
//       {
//         id: "neil-gaiman",
//         name: "Neil Gaiman",
//         image: "https://placehold.co/200x200?text=authors",
//       },
//       {
//         id: "dean-koontz",
//         name: "Dean Koontz",
//         image: "https://placehold.co/200x200?text=authors",
//       },
//       {
//         id: "clive-barker",
//         name: "Clive Barker",
//         image: "https://placehold.co/200x200?text=authors",
//       },
//     ],
//   },
//   {
//     id: "jk-rowling",
//     name: "J.K. Rowling",
//     image: "https://placehold.co/400x400?text=Author",
//     coverImage: "https://placehold.co/400x400?text=Cover",
//     bio: "Joanne Rowling, better known by her pen name J. K. Rowling, is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies, becoming the best-selling book series in history. The books are the basis of a popular film series, over which Rowling had overall approval on the scripts and was a producer on the final films. She also writes crime fiction under the pen name Robert Galbraith.",
//     birthDate: "July 31, 1965",
//     birthPlace: "Yate, Gloucestershire, England",
//     website: "https://www.jkrowling.com",
//     email: "info@jkrowling.com",
//     twitter: "@jk_rowling",
//     booksCount: 14,
//     genres: ["Fantasy", "Children's Fiction", "Mystery", "Crime Fiction"],
//     awards: [
//       "British Book Awards",
//       "Hugo Award",
//       "Bram Stoker Award",
//       "Hans Christian Andersen Literature Award",
//     ],
//     books: [
//       {
//         id: "harry-potter-philosophers-stone",
//         title: "Harry Potter and the Philosopher's Stone",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1997,
//         genre: "Fantasy",
//         rating: 4.7,
//         price: 15.99,
//       },
//       {
//         id: "harry-potter-chamber-secrets",
//         title: "Harry Potter and the Chamber of Secrets",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1998,
//         genre: "Fantasy",
//         rating: 4.6,
//         price: 15.99,
//       },
//       {
//         id: "harry-potter-prisoner-azkaban",
//         title: "Harry Potter and the Prisoner of Azkaban",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 1999,
//         genre: "Fantasy",
//         rating: 4.8,
//         price: 16.99,
//       },
//       {
//         id: "harry-potter-goblet-fire",
//         title: "Harry Potter and the Goblet of Fire",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 2000,
//         genre: "Fantasy",
//         rating: 4.7,
//         price: 17.99,
//       },
//       {
//         id: "casual-vacancy",
//         title: "The Casual Vacancy",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 2012,
//         genre: "Drama",
//         rating: 3.6,
//         price: 14.99,
//       },
//       {
//         id: "cuckoos-calling",
//         title: "The Cuckoo's Calling",
//         coverImage: "https://placehold.co/400x300?text=Books",
//         publishYear: 2013,
//         genre: "Crime Fiction",
//         rating: 3.9,
//         price: 13.99,
//       },
//     ],
//     relatedAuthors: [
//       {
//         id: "neil-gaiman",
//         name: "Neil Gaiman",
//         image: "https://placehold.co/200x200?text=author",
//       },
//       {
//         id: "george-rr-martin",
//         name: "George R.R. Martin",
//         image: "https://placehold.co/200x200?text=author",
//       },
//       {
//         id: "rick-riordan",
//         name: "Rick Riordan",
//         image: "https://placehold.co/200x200?text=author",
//       },
//     ],
//   },
//   // Other authors would be defined here
// ];

interface AuthorPageProps {
  params: {
    id: string;
  };
}

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
                          {[...Array(book?.rating)]?.map((_, i) => (
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
                          {getYear(book?.publishDate)}
                        </p>
                        <p className="font-bold">${book?.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href={`/books?author=${author?.id}`}>
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
                            {author.birthDate}
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
                {author.name}'s Genres
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
                      href={`/books?genre=${genre.toLowerCase().replace(/\s+/g, "-")}`}
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
