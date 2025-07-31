"use client";

import { Tag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { globalSearch } from "@/lib/actions/general";

import GlobalFilter from "../shared/GlobalFilter";
import { CommandGroup, CommandItem } from "../ui/command";
import { Skeleton } from "../ui/skeleton";

interface SearchCourseListProps {
  handleSelect: (callback: () => unknown) => void;
}

const SearchList = ({ handleSelect }: SearchCourseListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const keyword = searchParams.get("keyword") || "";
  const type = searchParams.get("type") || "";

  const [result, setResult] = useState([]);
  console.log("🚀 ~ SearchList ~ result:", result);
  // global search useEffect
  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        // fetch everything everywhere all at once => globalSearch, filter
        const res = await globalSearch({
          query: keyword,
          type,
        });

        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (keyword) {
      fetchResult();
    }
  }, [keyword, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "book":
        return `/books/${id}`;

      case "author":
        return `/authors/${id}`;

      case "publisher":
        return `/books/?publisher=${id}`;

      default:
        return "/";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-1 overflow-hidden px-1 py-2">
        <Skeleton className="h-12 rounded-sm" />
        <Skeleton className="h-12 rounded-sm" />
        <Skeleton className="h-12 rounded-sm" />
      </div>
    );
  }

  return (
    <>
      <GlobalFilter />
      <CommandGroup
        key={1}
        className="space-y-2 capitalize"
        heading={"Searched Items"}
      >
        {result.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          result?.map((item: any) => {
            return (
              <CommandItem
                key={item.id}
                className="h-14  cursor-pointer space-x-4"
                value={item?.title}
                onSelect={() =>
                  handleSelect(() =>
                    router.push(renderLink(item?.type, item.id))
                  )
                }
              >
                <Tag className="size-4 text-gray-500" />
                <p className="truncate">{item?.title}</p>
                <span className="ml-auto capitalize text-xs text-gray-500">
                  {item?.type}
                </span>
                <span className="sr-only">{item?.title}</span>
              </CommandItem>
            );
          })
        ) : (
          <div className="py-6 text-center text-sm">No results found.</div>
        )}
      </CommandGroup>
    </>
  );
};
export default SearchList;
