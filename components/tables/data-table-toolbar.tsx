"use client";

import type { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search authors..."
          className="pl-8"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select
          value={
            (table.getColumn("genres")?.getFilterValue() as string[])?.join(
              ","
            ) || "all"
          }
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("genres")?.setFilterValue(undefined);
            } else {
              table.getColumn("genres")?.setFilterValue([value]);
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="Horror">Horror</SelectItem>
            <SelectItem value="Fantasy">Fantasy</SelectItem>
            <SelectItem value="Thriller">Thriller</SelectItem>
            <SelectItem value="Romance">Romance</SelectItem>
            <SelectItem value="Literary Fiction">Literary Fiction</SelectItem>
            <SelectItem value="Mystery">Mystery</SelectItem>
            <SelectItem value="Science Fiction">Science Fiction</SelectItem>
            <SelectItem value="Historical Fiction">
              Historical Fiction
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={
            (table.getColumn("featured")?.getFilterValue() as string) || "all"
          }
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("featured")?.setFilterValue(undefined);
            } else {
              table.getColumn("featured")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            <SelectItem value="featured">Featured Only</SelectItem>
            <SelectItem value="standard">Non-Featured</SelectItem>
          </SelectContent>
        </Select>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
