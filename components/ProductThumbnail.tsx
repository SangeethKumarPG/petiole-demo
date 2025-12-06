import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import { getFinalPrice } from "@/lib/pricing";
import type { ThumbnailProduct } from "@/types/thumbnail-product";

function ProductThumbnail({ product }: { product: ThumbnailProduct }) {
  const isOutOfStock =
    product.variants?.length &&
    product.variants.every(
      (variant) =>
        (variant.stock != null && variant.stock <= 0) ||
        (variant.sizes &&
          variant.sizes.every((s) => (s.stock ?? 0) <= 0))
    );

  // Safe price object for getFinalPrice()
  const safeProduct = {
    price: product.price ?? undefined,
    discountPercentage: product.discountPercentage ?? undefined,
  };

  const finalPrice = getFinalPrice(safeProduct);
  const hasDiscount = (product.discountPercentage ?? 0) > 0;

  // Extract plain text from PortableText safely
  const descriptionText =
    product.description
      ?.map((block) => {
        if (!block || !("children" in block)) return "";
  
        return (block.children ?? [])
          .map((child) => ("text" in child && child.text ? child.text : ""))
          .join("");
      })
      .join(" ") ?? "";

  return (
    <Link
      href={`/product/${product.slug?.current ?? ""}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product Image"}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold">Out of stock</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {descriptionText}
        </p>

        {/* Price */}
        {!hasDiscount && (
          <p className="mt-2 text-lg font-bold text-gray-900">
            {formatCurrency(product.price ?? 0, "AED")}
          </p>
        )}

        {hasDiscount && (
          <div className="mt-2 flex flex-col items-center leading-tight">
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(product.price ?? 0, "AED")}
            </span>
            <span className="text-lg font-bold text-red-600">
              {formatCurrency(finalPrice, "AED")}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductThumbnail;
