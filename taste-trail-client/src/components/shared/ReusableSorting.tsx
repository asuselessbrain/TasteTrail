"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/types";


interface ReusableSortingProps {
  options: SortOption[];
  defaultValue?: string;
  className?: string; 
}

export default function ReusableSorting({
  options,
  defaultValue,
  className,
}: ReusableSortingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedValue =
    searchParams.get("sortBy") && searchParams.get("sortOrder")
      ? `${searchParams.get("sortBy")}-${searchParams.get("sortOrder")}`
      : defaultValue ?? options[0]?.value;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const [sortBy, sortOrder] = value.split("-");
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className={className ?? "w-56"}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
