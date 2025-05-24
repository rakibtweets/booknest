import { FileDown } from "lucide-react";
import type { Metadata } from "next";

import { orderColumns } from "@/components/tables/order-table/order-column";
import OrderTable from "@/components/tables/order-table/order-table";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/lib/actions/order-actions";

export const metadata: Metadata = {
  title: "Manage Orders - BookNext Admin",
  description: "Manage orders in the BookNext store",
};

export default async function AdminOrdersPage() {
  const response = await getOrders({});
  const orders = response.data?.orders || [];
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
            <p className="text-muted-foreground">
              View and manage customer orders
            </p>
          </div>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>
      </div>

      <OrderTable data={orders} columns={orderColumns} />
    </>
  );
}
