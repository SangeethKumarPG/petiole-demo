import ProductGrid from "@/components/ProductGrid";
import { searchProductsByColor } from "@/sanity/lib/products/searchProductsByColor";

interface SearchByColorPageProps {
  searchParams: Promise<{
    color?: string;
  }>;
}

async function SearchByColorPage({ searchParams }: SearchByColorPageProps) {
  const params = await searchParams;

  // Normalize input
  const rawColor = params.color ?? "";
  const color = rawColor.trim().toLowerCase();

  if (!color) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-brand-dark p-4">
        <div className="bg-brand-card p-8 rounded-lg shadow-lg w-full max-w-4xl border border-brand-border">
          <h1 className="text-3xl font-bold mb-6 text-center text-brand-text">
            Search <span className="text-brand-gold">Products by Color</span>
          </h1>
          <p className="text-brand-text text-center opacity-80">
            Please enter a color to search for products.
          </p>
        </div>
      </div>
    );
  }

  const products = await searchProductsByColor(color);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-brand-dark p-4">
        <div className="bg-brand-card p-8 rounded-lg shadow-lg w-full max-w-4xl border border-brand-border">
          <h1 className="text-3xl font-bold mb-6 text-center text-brand-text">
            No products found for color{" "}
            <span className="text-brand-gold">{rawColor}</span>
          </h1>
          <p className="text-brand-text text-center opacity-80">
            Try searching with a different color.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-brand-dark p-4">
      <div className="bg-brand-card p-8 rounded-lg shadow-lg w-full max-w-6xl border border-brand-border">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-text">
          Products with color{" "}
          <span className="text-brand-gold">{rawColor}</span>
        </h1>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchByColorPage;
