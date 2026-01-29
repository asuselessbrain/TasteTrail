"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Searching({placeholder}: {placeholder?: string}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <form onChange={handleSearch} className="w-full sm:w-1/2 mb-4">
      <Input
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}