import {
  ArrowLeft,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Package,
  Printer,
  Truck,
  User,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Order Details - BookNext Admin",
  description: "View order details in the admin dashboard",
};

// Mock orders data
const orders = [
  {
    id: "ORD-12345",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    date: "2023-04-15",
    status: "Delivered",
    total: 48.97,
    subtotal: 35.98,
    shipping: 4.99,
    tax: 8.0,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (ending in 4242)",
    shippingAddress: {
      name: "John Doe",
      street: "123 Book Street",
      city: "Bookville",
      state: "CA",
      zip: "90210",
      country: "United States",
    },
    billingAddress: {
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
        description: "Order #ORD-12345 was placed by customer.",
      },
      {
        status: "Payment Confirmed",
        date: "2023-04-15",
        description:
          "Payment of $48.97 was successfully processed via Credit Card.",
      },
      {
        status: "Processing",
        date: "2023-04-16",
        description: "Order is being processed and prepared for shipping.",
      },
      {
        status: "Shipped",
        date: "2023-04-17",
        description: "Order has been shipped via USPS. Tracking: #USP123456789",
      },
      {
        status: "Delivered",
        date: "2023-04-20",
        description: "Order was delivered successfully.",
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
        sku: "BK-ML-001",
      },
      {
        id: "2",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverImage: "https://placehold.co/120x80",
        price: 18.99,
        quantity: 1,
        sku: "BK-KS-002",
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

export default async function AdminOrderDetailsPage({
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
        href="/admin/orders"
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
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm font-medium">Status:</span>
              <Select defaultValue={order.status}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm">Update</Button>
            </div>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print Invoice
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4 flex justify-between items-center">
              <h2 className="font-semibold">Order Items</h2>
              <span className="text-sm text-muted-foreground">
                {order.items.length} items
              </span>
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
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku}
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
        </div>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Customer Information</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <Link
                    href={`/admin/users/${order.customer.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View Customer Profile
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.phone}
                  </p>
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
              <div className="flex items-start gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Payment Status</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

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

          {/* Shipping Information */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Shipping Address</h2>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{order.shippingAddress.name}</p>
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
        </div>
      </div>
    </>
  );
}
