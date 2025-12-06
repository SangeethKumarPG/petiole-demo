import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product"] 
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
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export type AllProductsResult = Awaited<ReturnType<typeof getAllProducts>>;
