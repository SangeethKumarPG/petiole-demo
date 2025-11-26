import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      price,
      description,
      image,
      
      // Fetch color variants properly
      variants[]{
        colorName,
        colorImage{
          asset->{
            _id,
            url
          }
        },
        stock,                 // color-level stock

        // size objects: { size, stock }
        sizes[]{
          size,
          stock
        }
      }
    }
  `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug }
    });

    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};
