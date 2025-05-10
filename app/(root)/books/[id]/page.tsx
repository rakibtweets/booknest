import { auth } from "@clerk/nextjs/server";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/buttons/AddToCartButton";
import AddToWishlist from "@/components/buttons/AddToWishlist";
import BookReviews from "@/components/sections/BookReviews";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBookById } from "@/lib/actions/book-actions";
import { getUserByClerkId } from "@/lib/actions/user-actions";
import { isBookInWishlist } from "@/lib/actions/wishlist-actions";

// const books = [
//   {
//     id: "1",
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     price: 16.99,
//     coverImage: "https://placehold.co/600x400?text=Books",
//     description:
//       "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
//     isbn: "978-0525559474",
//     publisher: "Viking",
//     publishDate: "September 29, 2020",
//     pages: 304,
//     language: "English",
//     categories: ["Fiction", "Fantasy", "Contemporary"],
//     rating: 4.2,
//     reviewCount: 127,
//     inStock: true,
//   },
// ];

export default async function BookDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  const { id } = await params;
  const bookResult = await getBookById(id);
  const book = bookResult.data?.book || null;
  const userData = await getUserByClerkId(userId as string);
  const user = userData.data?.user || null;
  const wishlistData = await isBookInWishlist(user?._id as string, id);
  const isInWishlist = wishlistData.data?.isInWishlist;

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
          <p className="text-lg text-muted-foreground mb-2">
            by{" "}
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              book.author.name
            }
          </p>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book?.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {(book.rating ?? 0).toFixed(1)} ({book.reviewCount} reviews)
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
            <AddToCartButton
              userId={user?._id as string}
              bookId={book._id as string}
              quantity={1}
              className="cursor-pointer"
              title="Add to Cart"
            />
            <AddToWishlist
              bookId={book._id as string}
              userId={user?._id as string}
              isInWishlist={isInWishlist}
            />
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
              <p className="text-sm">
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  book.publisher.name
                }
              </p>
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
          <TabsTrigger className="cursor-pointer" value="description">
            Description
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="reviews">
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-4">
          <p className="mt-4">{book.description}</p>
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
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    book.publisher.name
                  }
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
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">About the Author</h3>
              <p>
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  book.author?.bio
                }
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <BookReviews bookId={book._id as string} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
