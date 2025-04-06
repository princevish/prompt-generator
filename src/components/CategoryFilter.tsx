import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Schema } from "@/lib/db-types";

interface CategoryFilterProps {
  categories: Schema["categories"][];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-2 p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange("all")}
            className={cn(
              "rounded-full",
              activeCategory === "all"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-secondary"
            )}
          >
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => onCategoryChange(category.name)}
              className={cn(
                "rounded-full",
                activeCategory === category.name
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-secondary"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}