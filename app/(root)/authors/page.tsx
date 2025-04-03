import React from "react";
import { Metadata } from "next";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { authorFilters } from "@/constants";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Authors",
  description: "Authors page",
};
const popularAuthors = [
  {
    id: "1",
    name: "Stephen King",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 75,
  },
  {
    id: "2",
    name: "J.K. Rowling",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 14,
  },
  {
    id: "3",
    name: "James Patterson",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 114,
  },
  {
    id: "4",
    name: "Colleen Hoover",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 22,
  },
  {
    id: "5",
    name: "Haruki Murakami",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 28,
  },
  {
    id: "6",
    name: "Toni Morrison",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 18,
  },

  {
    id: "7",
    name: "George R.R. Martin",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 45,
  },
  {
    id: "8",
    name: "Agatha Christie",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 85,
  },
  {
    id: "9",
    name: "J.R.R. Tolkien",
    image: "https://placehold.co/200x200?text=Authors",
    booksCount: 30,
  },
];

const Page = () => {
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Authors</h1>

      {/* Search options */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/authors"
          iconPosition="left"
          placeholder="Search for Authors..."
          otherClasses="flex-1"
        />

        <Filter
          filters={authorFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* Main Content */}
      {/* Authors */}
      <div className="grid mt-9 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {popularAuthors.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.id}`}
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
    </>
  );
};

export default Page;
