import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import QuantityButton from "@/components/buttons/QuantityButton";
import RemoveFromCartButton from "@/components/buttons/RemoveFromCartButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { IBook } from "@/database/book.model";
import { getUserCart } from "@/lib/actions/cart-actions";
import { getUserByClerkId } from "@/lib/actions/user-actions";

export const metadata: Metadata = {
  title: "Shopping Cart - BookNext",
  description: "View and manage your shopping cart",
};

export default async function CartPage() {
  const { userId } = await auth();
  const userData = await getUserByClerkId(userId as string);
  const user = userData.data?.user || null;
  const catResult = await getUserCart(user?._id as string);
  const cartItems = catResult.data?.cart || [];
  const subtotal = catResult.data?.subtotal || 0;
  const shipping = catResult.data?.shipping || 0;
  const tax = catResult.data?.tax || 0;
  const total = catResult.data?.total || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/" className="flex items-center text-sm hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl font-bold ml-auto">Shopping Cart</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems?.length > 0 ? (
            <div className="space-y-4">
              {cartItems?.map(
                (
                  {
                    book,
                    quantity,
                  }: {
                    book: IBook;
                    quantity: number;
                  },
                  index
                ) => {
                  return (
                    <div key={index} className="flex gap-4 py-4">
                      <div className="relative aspect-[2/3] h-[120px]">
                        <Image
                          src={book?.coverImage || "/placeholder.svg"}
                          alt={book?.title}
                          fill
                          className="object-cover rounded"
                          sizes="120px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{book?.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                book.author.name
                              }
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(book?.price * quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <QuantityButton
                            quantity={quantity}
                            userId={user?._id as string}
                            bookId={book?._id as string}
                          />
                          <RemoveFromCartButton
                            userId={user?._id as string}
                            bookId={book?._id as string}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/books">Browse Books</Link>
              </Button>
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal as number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping as number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax as number}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total as number}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-6 pt-0">
              <Button className="w-full cursor-pointer" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <div className="space-y-2">
                <Label htmlFor="coupon">Coupon Code</Label>
                <div className="flex gap-2">
                  <Input id="coupon" placeholder="Enter coupon code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
