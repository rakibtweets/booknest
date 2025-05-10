import { BookOpen, DollarSign, Package, ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Dashboard - BookNext",
  description: "User dashboard for BookNext",
};

// Mock data for dashboard
const dashboardData = {
  stats: {
    totalOrders: 12,
    pendingOrders: 2,
    totalSpent: 248.95,
    wishlistItems: 8,
  },
  recentOrders: [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      status: "Delivered",
      total: 48.97,
      items: 2,
    },
    {
      id: "ORD-12346",
      date: "2023-03-28",
      status: "Shipped",
      total: 32.99,
      items: 1,
    },
    {
      id: "ORD-12347",
      date: "2023-03-10",
      status: "Processing",
      total: 75.5,
      items: 3,
    },
  ],
  recentlyViewed: [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "/placeholder.svg?height=400&width=300",
      price: 16.99,
    },
    {
      id: "2",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverImage: "/placeholder.svg?height=400&width=300",
      price: 18.99,
    },
    {
      id: "3",
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "/placeholder.svg?height=400&width=300",
      price: 15.99,
    },
    {
      id: "4",
      title: "The Four Winds",
      author: "Kristin Hannah",
      coverImage: "/placeholder.svg?height=400&width=300",
      price: 14.99,
    },
  ],
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {"Rakib Hasan"}! Here&apos;s an overview of your
          account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.stats.pendingOrders} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dashboardData.stats.totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Lifetime purchases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.wishlistItems}
            </div>
            <p className="text-xs text-muted-foreground">Saved for later</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Delivery
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.pendingOrders}
            </div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="viewed">Recently Viewed</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Your Orders</h2>
              <p className="text-sm text-muted-foreground">
                Manage and track your recent orders
              </p>
            </div>
            <div className="border-t">
              {dashboardData.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()} •{" "}
                      {order.items} {order.items === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">
                        ${order.total.toFixed(2)}
                      </div>
                      <div
                        className={`text-xs ${
                          order.status === "Delivered"
                            ? "text-green-500"
                            : order.status === "Shipped"
                              ? "text-blue-500"
                              : "text-orange-500"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="viewed">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Recently Viewed</h2>
              <p className="text-sm text-muted-foreground">
                Books you&apos;ve viewed recently
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
              {dashboardData.recentlyViewed.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="group"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    <p className="font-bold mt-1">${book.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
