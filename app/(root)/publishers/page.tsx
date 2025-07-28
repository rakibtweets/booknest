import type { Metadata } from "next";

import PublisherCard from "@/components/cards/PublisherCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import { publishersFilters } from "@/constants";
import { getPublishers } from "@/lib/actions/publisher-actions";
import { RouteParams } from "@/types/global";

export const metadata: Metadata = {
  title: "Publishers - BookNext",
  description: "Browse books by publisher on BookNext",
};

export default async function PublishersPage({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;
  const authorsResult = await getPublishers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 8,
    query,
    filter,
  });
  const publishers = authorsResult?.data?.publishers || [];
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Publishers</h1>
        <p className="text-muted-foreground">
          Browse books by publisher and discover new titles from your favorite
          publishing houses
        </p>
      </div>

      {/* Search options */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/publishers"
          iconPosition="left"
          placeholder="Search for publishers..."
          otherClasses="flex-1 "
        />

        <Filter
          filters={publishersFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* All Publishers */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          All Publishers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {publishers?.map((publisher) => (
            <PublisherCard
              key={publisher._id as string}
              publisher={publisher}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
