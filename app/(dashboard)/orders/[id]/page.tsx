import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Order Details - BookNext",
  description: "View your order details",
};

// Mock orders data
const orders = [
  {
    id: "ORD-12345",
    date: "2023-04-15",
    status: "Delivered",
    total: 48.97,
    subtotal: 35.98,
    shipping: 4.99,
    tax: 8.0,
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: {
      name: "John Doe",
      street: "123 Book Street",
      city: "Bookville",
      state: "CA",
      zip: "90210",
      country: "United States",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "2023-04-15",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Payment Confirmed",
        date: "2023-04-15",
        description: "Payment has been successfully processed.",
      },
      {
        status: "Shipped",
        date: "2023-04-17",
        description: "Your order has been shipped via USPS.",
      },
      {
        status: "Delivered",
        date: "2023-04-20",
        description: "Your order has been delivered.",
      },
    ],
    items: [
      {
        id: "1",
        title: "The Midnight Library",
        author: "Matt Haig",
        coverImage: "https://placehold.co/120x80",
        price: 16.99,
        quantity: 1,
      },
      {
        id: "2",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverImage: "https://placehold.co/120x80",
        price: 18.99,
        quantity: 1,
      },
    ],
  },
  // Other orders would be defined here
];

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <Link
        href="/orders"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to orders
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Order #{order.id}
            </h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-orange-100 text-orange-800"
              }`}
            >
              {order.status}
            </span>
            <Button variant="outline" size="sm">
              Need Help?
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 space-y-6">
          {/* Order Timeline */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Order Timeline</h2>
            </div>
            <div className="p-4">
              <ol className="relative border-l border-muted-foreground/20">
                {order.timeline.map((event, index) => (
                  <li key={index} className="mb-6 ml-6 last:mb-0">
                    <span
                      className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                        index === order.timeline.length - 1
                          ? "bg-green-100 text-green-800"
                          : "bg-muted"
                      }`}
                    >
                      {index === 0 ? (
                        <Package className="w-3 h-3" />
                      ) : index === order.timeline.length - 1 ? (
                        <Package className="w-3 h-3" />
                      ) : (
                        <Truck className="w-3 h-3" />
                      )}
                    </span>
                    <h3 className="font-medium">{event.status}</h3>
                    <time className="block text-xs text-muted-foreground mb-1">
                      {new Date(event.date).toLocaleDateString()}
                    </time>
                    <p className="text-sm">{event.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Order Items</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative aspect-[2/3] h-[120px]">
                      <Image
                        src={item.coverImage || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                        sizes="120px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.author}
                      </p>
                      <div className="mt-auto flex justify-between items-end">
                        <div>
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="text-sm">
                            Price: ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Order Summary</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Payment Information</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Shipping Information</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Customer</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Shipping Address</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.street}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            {order.status === "Delivered" && (
              <Button variant="outline">Write a Review</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
