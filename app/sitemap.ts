import { MetadataRoute } from "next";
import {
  getAllProducts,
  type AllProductsResult
} from "@/sanity/lib/products/getAllProducts";
import {
  getAllCategories,
  type AllCategoriesResult
} from "@/sanity/lib/products/getAllCategories";

function hasValidSlug(
  p: AllProductsResult[number]
): p is AllProductsResult[number] {
  return Boolean(p.slug?.current);
}

function hasValidCategorySlug(
  c: AllCategoriesResult[number]
): c is AllCategoriesResult[number] {
  return Boolean(c.slug?.current);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://petiolefashion.com";

  const products: AllProductsResult = await getAllProducts();
  const categories: AllCategoriesResult = await getAllCategories();

  // Static URLs
  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/about-us",
    "/contact",
    "/basket",
    "/policies"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date()
  }));

  // Category URLs
  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter(hasValidCategorySlug)
    .map((c: AllCategoriesResult[number]) => ({
      url: `${siteUrl}/category/${c.slug!.current!}`,
      lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date()
    }));

  // Product URLs
  const productUrls: MetadataRoute.Sitemap = products
    .filter(hasValidSlug)
    .map((p: AllProductsResult[number]) => ({
      url: `${siteUrl}/product/${p.slug!.current!}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date()
    }));

  return [...staticUrls, ...categoryUrls, ...productUrls];
}
