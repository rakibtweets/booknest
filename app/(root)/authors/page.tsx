import React, { Suspense } from "react";
import { Metadata } from "next";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { authorFilters } from "@/constants";
import Authors from "@/components/sections/Authors";
import { getAuthors } from "@/lib/actions/author-actions";

export const metadata: Metadata = {
  title: "Authors",
  description: "Authors page",
};

const Page = async () => {
  const authorsResult = await getAuthors();
  const authors = authorsResult?.data?.authors || [];
  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Authors</h1>

      {/* Search options */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/authors"
          iconPosition="left"
          placeholder="Search for Authors..."
          otherClasses="flex-1"
        />

        <Filter
          filters={authorFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* Main Content */}
      {/* Authors */}
      <div className="grid mt-9 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Authors authors={authors} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
