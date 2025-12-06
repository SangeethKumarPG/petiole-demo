import type {
  PortableTextBlock,
  PortableTextSpan,
  PortableTextMarkDefinition,
} from "@portabletext/types";

//
// A strict "block" type
//
export type SanityBlock = PortableTextBlock<
  PortableTextMarkDefinition,
  PortableTextSpan,
  string,
  string
>;

//
// A strict "image" type inside Portable Text
//
export type SanityImageBlock = {
  _type: "image";
  _key: string;
  asset?: { _ref: string };
  hotspot?: unknown;
  crop?: unknown;
};

//
// FINAL: Sanity description is ALWAYS a mixed list of blocks + images
//
export type SanityDescription =
  | (SanityBlock | SanityImageBlock)[]
  | null
  | undefined;
