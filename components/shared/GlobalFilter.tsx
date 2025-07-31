"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { GlobalSearchFilters } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils";

import { Badge } from "../ui/badge";

const GlobalFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleFilterClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="p-4">
      <div>
        <p className="text-sm font-base capitalize  text-gray-500">
          Filter by:
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {GlobalSearchFilters.map((item) => (
          <Badge
            variant={active === item.value ? "default" : "outline"}
            key={item.value}
            onClick={() => handleFilterClick(item.value)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.name}</span>
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
export default GlobalFilter;
