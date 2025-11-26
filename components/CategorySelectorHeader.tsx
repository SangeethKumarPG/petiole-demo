"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySelectorForHeaderProps {
  categories: ReadonlyArray<Category>;
}

export default function CategorySelectorForHeader({
  categories,
}: CategorySelectorForHeaderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  const selectedCategory = value
    ? categories.find((c) => c._id === value)
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 px-3 flex items-center gap-2 text-sm font-semibold",
            "bg-brand-gold text-brand-dark border-brand-border",
            "hover:bg-brand-lime transition rounded"
          )}
        >
          <span className="truncate max-w-[120px]">
            {selectedCategory?.title ?? "Categories"}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-80" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0 bg-brand-card border border-brand-border">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />

          <CommandList>
            <CommandEmpty>No categories found</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title ?? ""}
                  onSelect={() => {
                    setValue(category._id);
                    if (category.slug?.current) {
                      router.push(`/categories/${category.slug.current}`);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  {category.title}
                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
