"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/stripe";
import { formatCurrency } from "@/lib/utils";
import { IBook } from "@/database/book.model";

interface CartSummaryProps {
  items: {
    book: IBook;
    quantity: number;
  }[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isEditable?: boolean;
}

export default function CartSummary({
  items,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  shipping,
  tax,
  total,
  isEditable = true,
}: CartSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground">Add some books to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div
            key={item.book._id as string}
            className="flex items-center gap-4"
          >
            <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={
                  item.book?.coverImage ||
                  "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt={item.book.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex justify-between text-base font-medium">
                <h3 className="line-clamp-1">{item.book.title}</h3>
                <p className="ml-4">
                  {formatCurrency(item.book.price * item.quantity)}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                {
                  //@ts-ignore
                  item.book?.author?.name
                }
              </p>

              {isEditable ? (
                <div className="mt-2 flex items-center">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      // onClick={() => {
                      //   if (item.quantity > 1) {
                      //     onUpdateQuantity(item.book._id, item.quantity - 1);
                      //   }
                      // }}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      // onClick={() =>
                      //   onUpdateQuantity(item.book._id, item.quantity + 1)
                      // }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 text-sm text-muted-foreground"
                    // onClick={() => onRemoveItem(item.book._id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="mt-1 text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Shipping</p>
          <p>{shipping === 0 ? "Free" : formatCurrency(shipping)}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Tax</p>
          <p>{formatCurrency(tax)}</p>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between font-medium">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}
