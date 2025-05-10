"use client";

import { CheckCircle, ShoppingBag, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/stripe";

interface OrderConfirmationProps {
  order: Order;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="flex flex-col items-center p-4 md:p-6">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-6">
        <CheckCircle className="h-12 w-12 text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-center mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground text-center mb-6">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>

      <div className="w-full max-w-md bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Order Number:</span>
          <span className="font-medium">
            {order?.orderId?.substring(0, 8).toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Date:</span>
          <span className="font-medium">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Payment Method:</span>
          <span className="font-medium">{order?.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-bold">{order?.total}</span>
        </div>
      </div>

      <Separator className="my-6 w-full max-w-md" />

      <div className="w-full max-w-md mb-6">
        <h3 className="font-semibold mb-3">Order Summary</h3>
        <div className="space-y-3">
          {order?.items?.map((item) => (
            <div
              key={item?.book?._id as string}
              className="flex justify-between"
            >
              <div>
                <span className="font-medium">{item?.book?.title}</span>
                <span className="text-muted-foreground ml-2">
                  x{item?.quantity}
                </span>
              </div>
              <span>{item?.price * item?.quantity}</span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{order?.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{order?.shipping}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{order?.tax}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>{order?.total}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/orders">
            <FileText className="mr-2 h-4 w-4" />
            View Orders
          </Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
