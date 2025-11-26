"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";

interface FeaturedCategoriesProps {
  categories: ReadonlyArray<Category>;
}

// Local type for optional image field (strict)
type OptionalImage = {
  _type: "image";
  asset: { _ref: string };
} | null | undefined;

export default function FeaturedCategories({
  categories,
}: FeaturedCategoriesProps): JSX.Element {
  return (
    <section className="my-12 container mx-auto px-4">
      <h2 className="text-2xl font-bold text-brand-text mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.slice(0, 4).map((cat) => {
          // Type-safe narrowing
          const imageField: OptionalImage = (cat as unknown as { image?: OptionalImage }).image;

          const imageSrc: string =
            imageField ? imageUrl(imageField).url() : "/placeholder.png";

          return (
            <Link
              href={`/categories/${cat.slug?.current ?? ""}`}
              key={cat._id}
              className="
                group flex flex-col 
                bg-brand-card
                rounded-lg border border-brand-border 
                shadow-sm hover:shadow-md 
                transition-all duration-200 
                overflow-hidden
              "
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={cat.title ?? "Category"}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-semibold text-brand-text">
                  {cat.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
