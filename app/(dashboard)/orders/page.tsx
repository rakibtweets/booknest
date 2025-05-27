import { auth } from "@clerk/nextjs/server";
import { Package, TruckIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filderOders } from "@/constants";
import { IBook } from "@/database/book.model";
import { IOrder } from "@/database/order.model";
import { getUserOrders } from "@/lib/actions/order-actions";
import { RouteParams } from "@/types/global";

export const metadata: Metadata = {
  title: "Orders - BookNext",
  description: "View and manage your orders",
};

// Mock orders data
// const orders = [
//   {
//     id: "ORD-12345",
//     date: "2023-04-15",
//     status: "Delivered",
//     total: 48.97,
//     items: [
//       {
//         id: "1",
//         title: "The Midnight Library",
//         author: "Matt Haig",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 16.99,
//         quantity: 1,
//       },
//       {
//         id: "2",
//         title: "Klara and the Sun",
//         author: "Kazuo Ishiguro",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 18.99,
//         quantity: 1,
//       },
//     ],
//   },
//   {
//     id: "ORD-12346",
//     date: "2023-03-28",
//     status: "Shipped",
//     total: 32.99,
//     items: [
//       {
//         id: "3",
//         title: "Project Hail Mary",
//         author: "Andy Weir",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 15.99,
//         quantity: 1,
//       },
//       {
//         id: "4",
//         title: "The Four Winds",
//         author: "Kristin Hannah",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 14.99,
//         quantity: 1,
//       },
//     ],
//   },
//   {
//     id: "ORD-12347",
//     date: "2023-03-10",
//     status: "Processing",
//     total: 75.5,
//     items: [
//       {
//         id: "5",
//         title: "The Invisible Life of Addie LaRue",
//         author: "V.E. Schwab",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 17.99,
//         quantity: 1,
//       },
//       {
//         id: "6",
//         title: "The Vanishing Half",
//         author: "Brit Bennett",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 16.99,
//         quantity: 2,
//       },
//     ],
//   },
//   {
//     id: "ORD-12348",
//     date: "2023-02-22",
//     status: "Delivered",
//     total: 29.99,
//     items: [
//       {
//         id: "7",
//         title: "Hamnet",
//         author: "Maggie O'Farrell",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 15.99,
//         quantity: 1,
//       },
//       {
//         id: "8",
//         title: "The Song of Achilles",
//         author: "Madeline Miller",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 14.99,
//         quantity: 1,
//       },
//     ],
//   },
//   {
//     id: "ORD-12349",
//     date: "2023-01-15",
//     status: "Delivered",
//     total: 42.98,
//     items: [
//       {
//         id: "9",
//         title: "Circe",
//         author: "Madeline Miller",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 14.99,
//         quantity: 1,
//       },
//       {
//         id: "10",
//         title: "The Silent Patient",
//         author: "Alex Michaelides",
//         coverImage: "https://placehold.co/120x80?text=order",
//         price: 13.99,
//         quantity: 2,
//       },
//     ],
//   },
// ];

export default async function OrdersPage({ searchParams }: RouteParams) {
  const { userId } = await auth();
  const { page, pageSize, filter, query } = await searchParams;
  const response = await getUserOrders({
    userId: userId as string,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 8,
    query,
    filter,
  });
  const orders = response.data?.orders as IOrder[];

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground">
          View and track all your BookNext orders
        </p>
      </div>

      {/* Search options */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/orders"
          iconPosition="left"
          placeholder="Search for orders by orderId..."
          otherClasses="flex-1"
        />

        <Filter
          filters={filderOders}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          {orders?.map((order: IOrder) => (
            <div
              key={order._id as string}
              className="border rounded-lg overflow-hidden"
            >
              <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Order #{order?.orderId?.substring(0, 8).toUpperCase()}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">
                      Total: ${order.total.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/orders/${order._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="grid gap-4">
                  {order?.items?.map((item) => {
                    const { book, price, quantity } = item as {
                      book: IBook;
                      price: number;
                      quantity: number;
                    };
                    return (
                      <div
                        key={item?.book?._id as string}
                        className="flex gap-4"
                      >
                        <div className="relative aspect-[2/3] h-[80px]">
                          <Image
                            src={book?.coverImage || "/placeholder.svg"}
                            alt={book?.title}
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <h4 className="font-medium">{book?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              //@ts-ignore
                              book?.author?.name
                            }
                          </p>
                          <div className="mt-auto flex justify-between">
                            <span className="text-sm">Qty: {quantity}</span>
                            <span className="font-medium">
                              ${price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {order.status !== "Delivered" && (
                <div className="p-4 border-t bg-muted/50">
                  <div className="flex items-center gap-2">
                    {order.status === "Shipped" ? (
                      <>
                        <TruckIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          Your order is on its way! Estimated delivery: April
                          22, 2023
                        </span>
                      </>
                    ) : (
                      <>
                        <Package className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">
                          Your order is being processed. We&apos;ll notify you
                          when it ships.
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-6 mt-6">
          {orders
            .filter((order) => order?.status === "Processing")
            .map((order) => (
              <div
                key={order?._id as string}
                className="border rounded-lg overflow-hidden"
              >
                {/* Same content as above, filtered for Processing orders */}
                <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        Order #{order?.orderId?.substring(0, 8).toUpperCase()}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">
                        Total: ${order.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="grid gap-4">
                    {order.items.map((item) => {
                      const { book, price, quantity } = item as {
                        book: IBook;
                        price: number;
                        quantity: number;
                      };
                      return (
                        <div
                          key={item.book?._id as string}
                          className="flex gap-4"
                        >
                          <div className="relative aspect-[2/3] h-[80px]">
                            <Image
                              src={book?.coverImage || "/placeholder.svg"}
                              alt={book?.title}
                              fill
                              className="object-cover rounded"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h4 className="font-medium">{book?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                book?.author?.name
                              }
                            </p>
                            <div className="mt-auto flex justify-between">
                              <span className="text-sm">Qty: {quantity}</span>
                              <span className="font-medium">
                                ${price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 border-t bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">
                      Your order is being processed. We&apos;ll notify you when
                      it ships.
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {orders.filter((order) => order.status === "Processing").length ===
            0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No processing orders</h3>
              <p className="text-muted-foreground">
                You don&apos;t have any orders being processed at the moment.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-6 mt-6">
          {orders
            .filter((order) => order.status === "Shipped")
            .map((order) => (
              <div
                key={order._id as string}
                className="border rounded-lg overflow-hidden"
              >
                {/* Same content as above, filtered for Shipped orders */}
                <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        Order #{order?.orderId?.substring(0, 8).toUpperCase()}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">
                        Total: ${order.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="grid gap-4">
                    {order.items.map((item) => {
                      const { book, price, quantity } = item as {
                        book: IBook;
                        price: number;
                        quantity: number;
                      };
                      return (
                        <div
                          key={item.book._id as string}
                          className="flex gap-4"
                        >
                          <div className="relative aspect-[2/3] h-[80px]">
                            <Image
                              src={book?.coverImage || "/placeholder.svg"}
                              alt={book?.title}
                              fill
                              className="object-cover rounded"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h4 className="font-medium">{book?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                book?.author?.name
                              }
                            </p>
                            <div className="mt-auto flex justify-between">
                              <span className="text-sm">Qty: {quantity}</span>
                              <span className="font-medium">
                                ${price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 border-t bg-muted/50">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">
                      Your order is on its way! Estimated delivery: April 22,
                      2023
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {orders.filter((order) => order.status === "Shipped").length ===
            0 && (
            <div className="text-center py-12">
              <TruckIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No shipped orders</h3>
              <p className="text-muted-foreground">
                You don&apos;t have any orders being shipped at the moment.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6 mt-6">
          {orders
            .filter((order) => order.status === "Delivered")
            .map((order) => (
              <div
                key={order._id as string}
                className="border rounded-lg overflow-hidden"
              >
                <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        Order #{order?.orderId?.substring(0, 8).toUpperCase()}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">
                        Total: ${order.total.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="grid gap-4">
                    {order?.items?.map((item) => {
                      const { book, price, quantity } = item as {
                        book: IBook;
                        price: number;
                        quantity: number;
                      };
                      return (
                        <div
                          key={item?.book?._id as string}
                          className="flex gap-4"
                        >
                          <div className="relative aspect-[2/3] h-[80px]">
                            <Image
                              src={book?.coverImage || "/placeholder.svg"}
                              alt={book?.title}
                              fill
                              className="object-cover rounded"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h4 className="font-medium">{book?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                book?.author?.name
                              }
                            </p>
                            <div className="mt-auto flex justify-between">
                              <span className="text-sm">Qty: {quantity}</span>
                              <span className="font-medium">
                                ${price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

          {orders.filter((order) => order.status === "Delivered").length ===
            0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No delivered orders</h3>
              <p className="text-muted-foreground">
                You don&apos;t have any delivered orders yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
