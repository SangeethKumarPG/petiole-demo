import ProductClientUI from "./ProductClientUI";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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
  slug: { current: string };
  price: number;
  description: PortableTextBlock[];
  image?: SanityImageSource;
  variants?: Variant[];
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getProductBySlug(slug)) as FetchedProduct | null;

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 py-8">
        <ProductClientUI product={product} />
      </div>
    </div>
  );
}