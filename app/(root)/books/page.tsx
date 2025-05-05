import React from "react";
import { Metadata } from "next";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import { bookFilters, recommendedBooks } from "@/constants";
import Filter from "@/components/shared/Filter";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getBooks } from "@/lib/actions/book-actions";
import { IBook } from "@/database/book.model";
import { RouteParams } from "@/types/global";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/user-actions";
import AddToCartButton from "@/components/buttons/AddToCartButton";

export const metadata: Metadata = {
  title: "Books",
  description: "Books page",
};

const Page = async ({ searchParams }: RouteParams) => {
  const { userId } = await auth();
  const userData = await getUserByClerkId(userId as string);
  const user = userData.data?.user || null;
  const { page, pageSize, query, filter } = await searchParams;
  const bookResult = await getBooks({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });
  const books = bookResult.data?.books || [];
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      {/* Search options */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/books"
          iconPosition="left"
          placeholder="Search for Books..."
          otherClasses="flex-1 "
        />

        <Filter
          filters={bookFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* Books lists */}
      <div className="grid mt-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books?.map((book: IBook) => (
            <Card key={book._id as string} className="group p-2">
              <Link
                className="transition-colors hover:border-primary"
                href={`/books/${book._id}`}
              >
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
              </Link>
              <div className="mt-2">
                <Link
                  className="transition-colors hover:border-primary "
                  href={`/books/${book._id}`}
                >
                  <h3 className="font-medium line-clamp-1">{book.title}</h3>
                </Link>
                <Link
                  className="transition-colors hover:border-primary"
                  href={`/books/${book._id}`}
                >
                  <p className="text-sm text-muted-foreground">
                    {
                      //@ts-ignore
                      book.author?.name
                    }
                  </p>
                </Link>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(book?.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(book?.rating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < (book?.rating || 0)
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
                    {(book?.rating ?? 0).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">${book.price.toFixed(2)}</p>
                  {/* <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 cursor-pointer w-8"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button> */}
                  <AddToCartButton
                    bookId={book._id as string}
                    userId={user?._id as string}
                    quantity={1}
                    variant="ghost"
                    size="icon"
                    className="h-8 cursor-pointer w-8"
                  />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-4 flex items-center justify-center h-full w-full">
            <p className="text-muted-foreground">No books found</p>
          </div>
        )}
      </div>
    </>
  );
};
export default Page;
