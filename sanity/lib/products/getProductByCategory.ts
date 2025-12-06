import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (slug: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)]
    | order(name asc){
      _id,
      _createdAt,
      _updatedAt,
      _rev,
      name,
      slug,
      price,
      discountPercentage,
      image,
      variants[]{
        colorName,
        colorImage{
          asset->{ _id, url }
        },
        stock,
        sizes[]{
          size,
          stock
        }
      }
    }
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { slug },
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export type CategoryProduct =
  Awaited<ReturnType<typeof getProductByCategory>>[number];
