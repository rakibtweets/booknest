import { auth } from "@clerk/nextjs/server";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { Heart } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ClearWishlistButton from "@/components/buttons/ClearWishlistButton";
import { WishlistButton } from "@/components/buttons/WishListButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IBook } from "@/database/book.model";
import { getUserByClerkId } from "@/lib/actions/user-actions";
import { getUserWishlist } from "@/lib/actions/wishlist-actions";
import { formatCurrency } from "@/lib/utils";

// Import the Heart icon at the top of the file

export const metadata: Metadata = {
  title: "My Wishlist - BookNext",
  description: "View and manage your wishlist of books",
};

export default async function WishlistPage() {
  const { userId } = await auth();
  const userData = await getUserByClerkId(userId as string);
  const user = userData.data?.user || null;
  const { success, wishlist, error } = await getUserWishlist(
    user?._id as string
  );

  if (!success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error Loading Wishlist</h1>
          <p className="text-muted-foreground mb-6">
            {error || "An error occurred while loading your wishlist."}
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Browse our collection and add books you&apos;d like to purchase
            later.
          </p>
          <Button asChild>
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </p>
            <ClearWishlistButton userId={user?._id as string} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {wishlist?.map((book: IBook) => (
              <Card key={book._id as string} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-[120px] h-[180px] sm:h-full">
                      <Image
                        src={book?.coverImage as string}
                        alt={book?.title}
                        width={120}
                        height={180}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              <Link
                                href={`/books/${book._id}`}
                                className="hover:underline"
                              >
                                {book?.title}
                              </Link>
                            </h3>
                            <p className="text-muted-foreground">
                              by{" "}
                              <Link
                                href={`/authors/${book.author._id}`}
                                className="hover:underline"
                              >
                                {
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  //@ts-ignore
                                  book.author?.name
                                }
                              </Link>
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(book.price)}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>ISBN: {book.isbn}</p>
                          <p>Language: {book.language}</p>
                          <p>Pages: {book.pages}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button size="sm">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <WishlistButton
                            bookId={book._id as string}
                            userId={user?._id as string}
                            isInWishlist={true}
                            size="sm"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {book.stock > 0 ? (
                            <span className="text-green-600">In Stock</span>
                          ) : (
                            <span className="text-red-600">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/books">Continue Shopping</Link>
            </Button>
            <Button>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
