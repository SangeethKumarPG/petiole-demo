import ProductClientUI from "./ProductClientUI";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Script from "next/script";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export type VariantSize = {
  size: string;
  stock: number;
};

export type Variant = {
  colorName: string;
  colorImage?: SanityImageSource;
  stock?: number;
  sizes?: VariantSize[];
};

export type FetchedProduct = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug?: { current?: string };
  price: number;
  description?: PortableTextBlock[];
  image?: SanityImageSource;
  variants?: Variant[];
};

function urlFor(source: SanityImageSource) {
  const builder = imageUrlBuilder(client);
  return builder.image(source).url();
}

function blockToPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks || blocks.length === 0) return "";
  return blocks
    .map((block) => {
      if (!("children" in block) || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => ("text" in child ? child.text : ""))
        .join(" ");
    })
    .join("\n");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getProductBySlug(slug)) as FetchedProduct | null;

  if (!product) return notFound();

  const baseSlug = product.slug?.current ?? slug;

  const mainImage = product.image ? urlFor(product.image) : undefined;

  const variantImages: string[] =
    product.variants
      ?.map((variant) =>
        variant.colorImage ? urlFor(variant.colorImage) : null
      )
      .filter((img): img is string => Boolean(img)) ?? [];

  const allImages: string[] = [mainImage, ...variantImages].filter(
    (img): img is string => Boolean(img)
  );

  const descriptionText = blockToPlainText(product.description);

  const offers =
    product.variants?.map((variant) => ({
      "@type": "Offer",
      priceCurrency: "AED",
      price: product.price,
      availability:
        typeof variant.stock === "number" && variant.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      sku: `${baseSlug}-${variant.colorName}`,
      url: `https://petiolefashion.com/product/${baseSlug}`,
      color: variant.colorName,
      size: variant.sizes?.map((s) => s.size) ?? [],
    })) ?? [];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: allImages,
    description: descriptionText,
    sku: baseSlug,
    brand: {
      "@type": "Brand",
      name: "Petiole Fashion",
    },
    offers,
    url: `https://petiolefashion.com/product/${baseSlug}`,
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-brand-dark">
        <div className="container mx-auto px-4 py-8">
          <ProductClientUI product={product} />
        </div>
      </div>
    </>
  );
}
  