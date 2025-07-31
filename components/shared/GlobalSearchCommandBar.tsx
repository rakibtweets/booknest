"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { formUrlQuery, isMacOs, removeKeysFromUrlQuery } from "@/lib/utils";

import SearchList from "../sections/SearchList";
// import SearchCourseList from '../sections/SearchCourseList';

const GlobalSearchCommandBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    if (debouncedQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "keyword",
        value: debouncedQuery,
      });
      router.push(newUrl, { scroll: false });
    } else {
      if (keyword) {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["keyword", "type"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [debouncedQuery, router, searchParams, keyword]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setOpen(false);
    callback();
  }, []);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      // Call the API when the command dialog is opened
    } else {
      setQuery("");
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["keyword"],
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <>
      <Button
        variant="outline"
        className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Global search...</span>
        <span className="sr-only">Global search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <abbr
            title={isMacOs() ? "Command" : "Control"}
            className="no-underline"
          >
            {isMacOs() ? "⌘" : "Ctrl"}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Type a command or search..."
        />

        {/* <CommandList>
            <CommandGroup className="py-4" heading="Search type">
              <GlobalFilter />
            </CommandGroup>
          </CommandList> */}

        {keyword ? (
          <CommandList>
            <SearchList handleSelect={handleSelect} />
          </CommandList>
        ) : null}
      </CommandDialog>
    </>
  );
};
export default GlobalSearchCommandBar;
