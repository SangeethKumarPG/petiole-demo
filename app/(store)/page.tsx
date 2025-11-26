import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

import ProductsView from "@/components/ProductsView";
import SaleBanner from "@/components/SaleBanner";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedCategories from "@/components/landing/FeaturedCategories";
import NewsletterBanner from "@/components/landing/NewsletterBanner";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="bg-brand-dark">
      {/* Boutique Hero Section */}
      <HeroSection />

      {/* Black Friday banner */}
      <SaleBanner />

      {/* Category showcase */}
      <FeaturedCategories categories={categories} />

      {/* Product listing */}
      <section className="flex flex-col items-center min-h-screen bg-brand-page p-4">
        
        {/* ⭐ New Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-6">
          All Products
        </h2>

        <ProductsView products={products} categories={categories} />
      </section>

      {/* Newsletter Signup */}
      <NewsletterBanner />
    </div>
  );
}
