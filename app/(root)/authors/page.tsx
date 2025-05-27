import { Metadata } from "next";
import React, { Suspense } from "react";

import Authors from "@/components/sections/Authors";
import ServerPagination from "@/components/sections/ServerPagination";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import { authorFilters } from "@/constants";
import { getAuthors } from "@/lib/actions/author-actions";
import { RouteParams } from "@/types/global";

export const metadata: Metadata = {
  title: "Authors",
  description: "Authors page",
};

const Page = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const authorsResult = await getAuthors({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 8,
    query,
    filter,
  });
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

      {/* pagination */}
      <div className="mt-8">
        <ServerPagination
          currentPage={authorsResult.data?.currentPage}
          totalPages={authorsResult.data?.totalPages}
          nextPage={authorsResult.data?.nextPage}
          prevPage={authorsResult.data?.prevPage}
        />
      </div>
    </>
  );
};

export default Page;
