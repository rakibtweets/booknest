import type { Metadata } from "next";

import { PublisherForm } from "@/components/forms/publisher-form";

export const metadata: Metadata = {
  title: "Add New Publisher - BookNext Admin",
  description: "Add a new publisher to the BookNext store",
};

export default async function AddPublisherPage() {
  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Publisher</h1>
        <p className="text-muted-foreground">
          Create a new publisher in the BookNext store
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <PublisherForm />
      </div>
    </>
  );
}
