import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublisherById } from "@/lib/actions/publisher-actions";
import { PublisherForm } from "@/components/forms/publisher-form";

export const metadata: Metadata = {
  title: "Edit Publisher - BookNext Admin",
  description: "Edit a publisher in the BookNext store",
};

interface EditPublisherPageProps {
  params: {
    id: string;
  };
}

export default async function EditPublisherPage({
  params,
}: EditPublisherPageProps) {
  const { id } = await params;
  try {
    // Fetch publisher for the form
    const publisher = await getPublisherById(id);

    // Format the publisher data for the form
    const formattedPublisher = {
      ...publisher,
      _id: publisher.id.toString(),
    };

    return (
      <>
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Publisher</h1>
          <p className="text-muted-foreground">
            Update publisher information in the BookNext store
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <PublisherForm initialData={formattedPublisher} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching publisher:", error);
    notFound();
  }
}
