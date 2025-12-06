import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { BlockContent } from "@/sanity.types";

// Match Sanity size object exactly
export type ThumbnailVariantSize = {
  size?: string | null;   // <-- now optional + nullable
  stock?: number | null;
  _key?: string;
};

// Match Sanity variant exactly
export type ThumbnailVariant = {
  colorName?: string | null;
  colorImage?: SanityImageSource | null;
  stock?: number | null;
  sizes?: ThumbnailVariantSize[] | null;
  _key?: string;
};

// Match Sanity Product as closely as possible
export type ThumbnailProduct = {
  _id: string;
  name?: string | null;
  slug?: { _type?: "slug"; current?: string | null } | null;
  price?: number | null;
  discountPercentage?: number | null;
  description?: BlockContent | null | undefined;
  image?: SanityImageSource | null;
  variants?: ThumbnailVariant[] | null;
};
