"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LucideSearch } from "lucide-react"; // optional: search icon

export default function Searching({ placeholder }: { placeholder?: string }) {
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
    <form onChange={handleSearch} className="w-full sm:w-1/2 relative">
      {/* Search icon */}
      <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

      <Input
        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm w-full"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
