import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getFeaturedBooks } from "@/lib/actions/book-actions";

// const featuredBooks = [
//   {
//     id: "1",
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     price: 16.99,
//     coverImage: "https://placehold.co/400x300?text=Books",
//     badge: "Bestseller",
//   },
//   {
//     id: "2",
//     title: "Klara and the Sun",
//     author: "Kazuo Ishiguro",
//     price: 18.99,
//     coverImage: "https://placehold.co/400x300?text=Books",
//     badge: "New Release",
//   },
//   {
//     id: "3",
//     title: "Project Hail Mary",
//     author: "Andy Weir",
//     price: 15.99,
//     coverImage: "https://placehold.co/400x300?text=Books",
//     badge: "Popular",
//   },
//   {
//     id: "4",
//     title: "The Four Winds",
//     author: "Kristin Hannah",
//     price: 14.99,
//     coverImage: "https://placehold.co/400x300?text=Books",
//   },
// ];

export default async function FeaturedBooks() {
  // Fetch featured books from an API or database
  const result = await getFeaturedBooks({
    limit: 4,
  });
  if (!result.success) {
    return <div>Error fetching featured books</div>;
  }
  const featuredBooks = result.data?.books;
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Featured Books</h2>
        <Link href="/books" className="flex items-center text-sm text-primary">
          View all books
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredBooks?.map((book) => (
          <Link
            className="transition-colors hover:border-primary"
            key={book._id as string}
            href={`/books/${book._id}`}
          >
            <Card className="group p-2">
              <AspectRatio
                ratio={18 / 10}
                className="relative w-full overflow-hidden rounded-md"
              >
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
                {/* {book.badge && (
                  <Badge className="absolute top-2 right-2">{book.badge}</Badge>
                )} */}
              </AspectRatio>
              <div className="mt-2">
                <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {
                    //@ts-ignore
                    book.author?.name
                  }
                </p>
                <p className="font-bold mt-1">${book.price.toFixed(2)}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
