import {
  BookOpen,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAdminDashboardStats } from "@/lib/actions/user-actions";

export const metadata: Metadata = {
  title: "Admin Dashboard - BookNext",
  description: "Admin dashboard for BookNext",
};

export default async function AdminDashboardPage() {
  const response = await getAdminDashboardStats();
  const dashboardStats = response?.data;
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {"Rakib Hasan"}! Here&apos;s an overview of your store.
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
              ${dashboardStats?.stats?.totalSales.toFixed(2)}
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
              {dashboardStats?.stats?.totalOrders}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-orange-500">
                {dashboardStats?.stats?.pendingOrders} pending
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
              {dashboardStats?.stats?.totalUsers}
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
              {dashboardStats?.stats?.totalBooks}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
              <span className="text-orange-500">
                {dashboardStats?.stats?.lowStock} low stock
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardStats?.recentOrders &&
                dashboardStats.recentOrders.length > 0 ? (
                  dashboardStats?.recentOrders?.map((order) => (
                    <TableRow key={order?._id}>
                      <TableCell className="font-medium">
                        {order?.orderId?.substring(0, 8).toUpperCase()}
                      </TableCell>
                      <TableCell>{order?.customer}</TableCell>
                      <TableCell>
                        {new Date(order?.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/orders/${order?._id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No recent orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="p-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/orders">View All Orders</Link>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardStats?.recentUsers &&
                dashboardStats.recentUsers.length > 0 ? (
                  dashboardStats.recentUsers.map((user) => (
                    <TableRow key={user._id as string}>
                      <TableCell className="font-medium">
                        {user?.name}
                      </TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>
                        {new Date(user?.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{user?.orders}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No recent users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
