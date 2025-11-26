"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { ChevronsUpDown, Check } from "lucide-react";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup
} from "./command";

import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
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
            "w-full max-w-full relative flex justify-center sm:justify-start items-center space-x-2",
            "bg-brand-gold hover:bg-brand-lime/80 text-brand-dark font-bold py-2 px-4 rounded"
          )}
        >
          {selectedCategory?.title ?? "Filter by category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            className="h-9"
            placeholder="Search category..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const searchText = e.currentTarget.value.toLowerCase();
                const match = categories.find((c) =>
                  c.title?.toLowerCase().includes(searchText)
                );

                if (match?.slug?.current) {
                  setValue(match._id);
                  router.push(`/categories/${match.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />

          <CommandList>
            <CommandEmpty>No category found</CommandEmpty>

            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title ?? ""}
                  onSelect={() => {
                    setValue(
                      value === category._id ? "" : category._id
                    );
                    if (category.slug?.current) {
                      router.push(`/categories/${category.slug.current}`);
                    }
                    setOpen(false);
                  }}
                >
                  {category.title}

                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
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
