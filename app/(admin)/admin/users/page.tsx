import { UserPlus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { userColumns } from "@/components/tables/users-table/user-columns";
import UserTable from "@/components/tables/users-table/user-table";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/lib/actions/user-actions";

export const metadata: Metadata = {
  title: "Manage Users - BookNext Admin",
  description: "Manage users in the BookNext store",
};

export default async function AdminUsersPage() {
  const response = await getUsers();
  const users = response.data?.users || [];
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">
              View and manage user accounts
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/users/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Link>
          </Button>
        </div>
      </div>

      <UserTable data={users} columns={userColumns} />
    </>
  );
}
