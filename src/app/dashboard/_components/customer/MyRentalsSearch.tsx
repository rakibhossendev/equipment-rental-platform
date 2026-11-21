
"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RentalsSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function RentalsSearch({
  search,
  onSearchChange,
}: RentalsSearchProps) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search equipment..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="h-10 pl-9 pr-10"
      />

      {search && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onSearchChange("")}
          className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
