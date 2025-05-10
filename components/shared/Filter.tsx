"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}
const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsFilter = searchParams.get("filter");
  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={(value) => handleUpdateParams(value)}
        defaultValue={paramsFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} font-normal    border px-5 py-2.5 focus:outline-none`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent className=" text-sm border-none  focus:outline-none active:outline-none ">
          <SelectGroup>
            {filters.map((item) => {
              return (
                <SelectItem
                  className="cursor-pointer "
                  key={item.value}
                  value={item.value}
                >
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
