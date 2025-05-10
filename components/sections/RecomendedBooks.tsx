import { ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const recommendedBooks = [
  {
    id: "5",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    price: 17.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.5,
  },
  {
    id: "6",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    price: 16.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.7,
  },
  {
    id: "7",
    title: "Hamnet",
    author: "Maggie O'Farrell",
    price: 15.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.3,
  },
  {
    id: "8",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 14.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.8,
  },
];

export default function RecommendedBooks() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Recommended For You
        </h2>
        <Link
          href="/books/recommended"
          className="flex items-center text-sm text-primary"
        >
          View all recommendations
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedBooks.map((book) => (
          <Link
            className="transition-colors hover:border-primary"
            key={book.id}
            href={`/books/${book.id}`}
          >
            <Card className="group p-2">
              <AspectRatio
                ratio={18 / 10}
                className="relative  w-full overflow-hidden rounded-md"
              >
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
              <div className="mt-2">
                <h3 className="font-medium line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(book.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < book.rating
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
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">${book.price.toFixed(2)}</p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 cursor-pointer w-8"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
