import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import BookReviews from "@/components/sections/BookReviews";

const books = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    coverImage: "https://placehold.co/600x400?text=Books",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
    isbn: "978-0525559474",
    publisher: "Viking",
    publishDate: "September 29, 2020",
    pages: 304,
    language: "English",
    categories: ["Fiction", "Fantasy", "Contemporary"],
    rating: 4.2,
    reviewCount: 127,
    inStock: true,
  },
];

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/books"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to books
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="flex justify-center">
          <div className="relative aspect-[2/3] w-full max-w-md">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg text-muted-foreground mb-2">by {book.author}</p>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {book.rating.toFixed(1)} ({book.reviewCount} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold mb-4">${book.price.toFixed(2)}</p>

          <p className="text-sm mb-6">{book.description}</p>

          <div className="flex items-center mb-4">
            <div
              className={`h-3 w-3 rounded-full mr-2 ${book.inStock ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span>{book.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row mb-6">
            <AddToCartButton bookId={book.id} />
            <Button variant="outline">Add to Wishlist</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">Free shipping on orders over $35</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">30-day return policy</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">ISBN</p>
              <p className="text-sm">{book.isbn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Publisher</p>
              <p className="text-sm">{book.publisher}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Publication Date</p>
              <p className="text-sm">{book.publishDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pages</p>
              <p className="text-sm">{book.pages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="text-sm">{book.language}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-sm">{book.categories.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-4">
          <p>{book.description}</p>
          <p className="mt-4">
            A dazzling novel about all the choices that go into a life well
            lived, from the internationally bestselling author of Reasons to
            Stay Alive and How To Stop Time.
          </p>
          <p className="mt-4">
            Somewhere out beyond the edge of the universe there is a library
            that contains an infinite number of books, each one the story of
            another reality. One tells the story of your life as it is, along
            with another book for the other life you could have lived if you had
            made a different choice at any point in your life. While we all
            wonder how our lives might have been, what if you had the chance to
            go to the library and see for yourself? Would any of these other
            lives truly be better?
          </p>
        </TabsContent>
        <TabsContent value="details" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </li>
                <li>
                  <span className="font-medium">Publisher:</span>{" "}
                  {book.publisher}
                </li>
                <li>
                  <span className="font-medium">Publication Date:</span>{" "}
                  {book.publishDate}
                </li>
                <li>
                  <span className="font-medium">Pages:</span> {book.pages}
                </li>
                <li>
                  <span className="font-medium">Language:</span> {book.language}
                </li>
                <li>
                  <span className="font-medium">Dimensions:</span> 5.5 x 0.8 x
                  8.2 inches
                </li>
                <li>
                  <span className="font-medium">Weight:</span> 10.4 ounces
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">About the Author</h3>
              <p>
                Matt Haig is the author of the internationally bestselling
                memoir Reasons to Stay Alive, along with five novels, including
                How To Stop Time, and several award-winning children's books.
                His work has been translated into more than thirty languages.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <BookReviews bookId={book.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
