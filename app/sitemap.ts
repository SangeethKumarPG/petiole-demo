import { MetadataRoute } from "next";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://petiolefashion.com";

  // Fetch products
  const products = await getAllProducts();

  // Fetch categories
  const categories = await getAllCategories();

  // 1️⃣ Static pages
  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/about-us",
    "/contact",
    "/basket",
    // "/privacy",
    "/policies"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  // 2️⃣ Category URLs
  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug) // ensure defined
    .map((c): MetadataRoute.Sitemap[number] => ({
      url: `${siteUrl}/category/${c.slug}`,
      lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
    }));

  // 3️⃣ Product URLs
  const productUrls: MetadataRoute.Sitemap = products
    .filter((p) => p.slug?.current) // ensure defined
    .map((p): MetadataRoute.Sitemap[number] => ({
      url: `${siteUrl}/product/${p.slug!.current!}`, // safe after filter
      lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    }));

  // Return everything together
  return [
    ...staticUrls,
    ...categoryUrls,
    ...productUrls,
  ];
}
