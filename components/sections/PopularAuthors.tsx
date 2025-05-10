import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFeaturedAuthors } from "@/lib/actions/author-actions";

// const popularAuthors = [
//   {
//     id: "1",
//     name: "Stephen King",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 75,
//   },
//   {
//     id: "2",
//     name: "J.K. Rowling",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 14,
//   },
//   {
//     id: "3",
//     name: "James Patterson",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 114,
//   },
//   {
//     id: "4",
//     name: "Colleen Hoover",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 22,
//   },
//   {
//     id: "5",
//     name: "Haruki Murakami",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 28,
//   },
//   {
//     id: "6",
//     name: "Toni Morrison",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 18,
//   },
// ];

export default async function PopularAuthors() {
  // Fetch popular authors from an API or database
  const result = await getFeaturedAuthors({
    limit: 6,
  });
  if (!result.success) {
    return <div>Error fetching popular authors</div>;
  }
  const authors = result.data?.authors;
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Popular Authors</h2>
        <Link
          href="/authors"
          className="flex items-center text-sm text-primary"
        >
          View all authors
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {authors?.map((author) => (
          <Link
            key={author._id as string}
            href={`/authors/${author._id}`}
            className="flex flex-col items-center text-center group"
          >
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-3 transition-transform group-hover:scale-105">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-sm md:text-base">{author.name}</h3>
            <p className="text-xs text-muted-foreground">
              {author.booksCount} books
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
