import type { ThumbnailProduct } from "@/types/thumbnail-product";
import type { Category } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/categorySelector";

interface ProductsViewProps {
  products: ThumbnailProduct[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

      <div className="flex-1">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;
