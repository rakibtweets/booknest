"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomeInputProps {
  route?: string;
  iconPosition: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  placeholder,
  otherClasses,
}: CustomeInputProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);
  return (
    <div
      className={`flex min-h-[56px] grow justify-center items-center gap-4 rounded-[10px] px-0 ${otherClasses}`}
    >
      <div className="relative w-full">
        {iconPosition === "left" && (
          <Search
            width={24}
            height={24}
            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`font-normal min-h-[56px] no-focus placeholder  shadow-none outline-none w-full ${
            iconPosition === "left"
              ? "pl-10"
              : iconPosition === "right"
                ? "pr-10"
                : ""
          }`}
        />
        {iconPosition === "right" && (
          <Search
            width={24}
            height={24}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          />
        )}
      </div>
    </div>
  );
};
export default LocalSearchBar;
