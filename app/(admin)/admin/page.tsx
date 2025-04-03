import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { dashboardData } from "@/constants/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard - BookNext",
  description: "Admin dashboard for BookNext",
};

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {"Rakib Hasan"}! Here's an overview of your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dashboardData.stats.totalSales.toFixed(2)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.totalOrders}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-orange-500">
                {dashboardData.stats.pendingOrders} pending
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.totalUsers}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+5.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.stats.totalBooks}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
              <span className="text-orange-500">
                {dashboardData.stats.lowStock} low stock
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="books">Top Selling Books</TabsTrigger>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <p className="text-sm text-muted-foreground">
                Manage and track recent orders
              </p>
            </div>
            <div className="border-t">
              <div className="grid grid-cols-6 bg-muted px-4 py-3 text-sm font-medium">
                <div>Order ID</div>
                <div>Customer</div>
                <div>Date</div>
                <div>Status</div>
                <div>Total</div>
                <div className="text-right">Actions</div>
              </div>
              {dashboardData.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-6 px-4 py-3 border-t text-sm"
                >
                  <div className="font-medium">{order.id}</div>
                  <div>{order.customer}</div>
                  <div>{new Date(order.date).toLocaleDateString()}</div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                  <div>${order.total.toFixed(2)}</div>
                  <div className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="books">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Top Selling Books</h2>
              <p className="text-sm text-muted-foreground">
                Books with the highest sales
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {dashboardData.topSellingBooks.map((book) => (
                <div key={book.id} className="flex gap-4 p-3 border rounded-lg">
                  <div className="relative aspect-[2/3] h-[100px]">
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover rounded"
                      sizes="100px"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-medium line-clamp-1">{book.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <p className="text-sm mt-1">${book.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium text-green-600">
                        {book.sales} sold
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/books">Manage Books</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="users">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Recent Users</h2>
              <p className="text-sm text-muted-foreground">
                Recently registered users
              </p>
            </div>
            <div className="border-t">
              <div className="grid grid-cols-4 bg-muted px-4 py-3 text-sm font-medium">
                <div>Name</div>
                <div>Email</div>
                <div>Join Date</div>
                <div>Orders</div>
              </div>
              {dashboardData.recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-4 px-4 py-3 border-t text-sm"
                >
                  <div className="font-medium">{user.name}</div>
                  <div>{user.email}</div>
                  <div>{new Date(user.joinDate).toLocaleDateString()}</div>
                  <div>{user.orders}</div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/users">Manage Users</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
