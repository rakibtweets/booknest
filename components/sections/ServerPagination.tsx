"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

interface ReviewsPaginationProps {
  currentPage: number | undefined;
  totalPages: number | undefined;
  nextPage: number | null | undefined;
  prevPage: number | null | undefined;
}

interface handleNavigationProps {
  type?: "prev" | "next";
  page?: number;
}

export default function ServerPagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: ReviewsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPrevDisabled = !prevPage || prevPage < 1;
  const isNextDisabled = !nextPage || !totalPages || nextPage > totalPages;
  const handleNavigation = ({ type, page }: handleNavigationProps) => {
    if (type === "prev" && prevPage !== null) {
      page = prevPage;
    } else if (type === "next" && nextPage !== null) {
      page = nextPage;
    }
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page !== undefined ? page.toString() : "",
    });

    router.push(newUrl);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, (currentPage ?? 1) - delta);
      i <= Math.min((totalPages ?? 1) - 1, (currentPage ?? 1) + delta);
      i++
    ) {
      range.push(i);
    }

    if ((currentPage ?? 1) - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if ((currentPage ?? 1) + delta < (totalPages ?? 1) - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages && totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={() =>
                handleNavigation({
                  type: "prev",
                  page: prevPage ?? undefined,
                })
              }
              size={"default"}
              disabled={isPrevDisabled}
              variant={"default"}
              className="cursor-poiner gap-1 px-2.5 sm:pl-2.5"
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </Button>
          </PaginationItem>
          {visiblePages.map((page, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;

            return (
              <>
                {page === "..." ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNumber}>
                    <Button
                      onClick={() =>
                        handleNavigation({
                          page: pageNumber,
                        })
                      }
                      size={"default"}
                      disabled={isActive}
                      variant={isActive ? "outline" : "ghost"}
                      className="cursor-poiner"
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                )}
              </>
            );
          })}

          <PaginationItem>
            <Button
              onClick={() =>
                handleNavigation({
                  type: "next",
                  page: nextPage ?? undefined,
                })
              }
              disabled={isNextDisabled}
              variant={"default"}
              className="cursor-poiner gap-1 px-2.5 sm:pr-2.5"
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
