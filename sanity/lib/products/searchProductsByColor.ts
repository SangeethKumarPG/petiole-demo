import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types";

const SEARCH_PRODUCTS_BY_COLOR_QUERY = defineQuery(`
  *[
    _type == "product" &&
    count(
      variants[
        lower(string(colorName)) match $color
      ]
    ) > 0
  ] | order(name asc)
`);

export const searchProductsByColor = async (
  color: string
): Promise<Product[]> => {
  const cleaned = color.trim().toLowerCase();
  if (!cleaned) return [];

  try {
    const products = await sanityFetch<typeof SEARCH_PRODUCTS_BY_COLOR_QUERY>({
      query: SEARCH_PRODUCTS_BY_COLOR_QUERY,
      params: { color: cleaned },
    });

    return products.data ?? [];
  } catch (error) {
    console.error("Error searching products by color:", error);
    return [];
  }
};
