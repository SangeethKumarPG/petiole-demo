"use client";

import { useBasketStore } from "@/lib/store/store";
import { Product } from "@/sanity.types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useEffect, useState } from "react";

type VariantSize = {
  _key?: string;
  size?: string;
  stock?: number;
};

type Variant = {
  colorName?: string;
  colorCode?: string | null;
  stock?: number;
  sizes?: VariantSize[];
  colorImage?: SanityImageSource;
};

export type BasketProduct = Product & {
  selectedColor?: string | null;
  selectedSize?: string | null;
  variants?: Variant[];
};

type AddtoBasketProps = {
  product: BasketProduct;
  disabled?: boolean;
};

export default function AddtoBasketButton({
  product,
  disabled = false,
}: AddtoBasketProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  const variant =
    product.variants?.find((v) => v.colorName === product.selectedColor) ?? null;

  const sizeInfo =
    variant?.sizes?.find((s) => s.size === product.selectedSize) ?? null;

  const isOutOfStock =
    !variant ||
    (variant.stock !== undefined && variant.stock <= 0) ||
    (sizeInfo?.stock !== undefined && sizeInfo.stock <= 0);

  const itemCount = getItemCount(
    product._id,
    product.selectedColor ?? null,
    product.selectedSize ?? null
  );

  const preventAdd =
    disabled || !product.selectedColor || !product.selectedSize || isOutOfStock;

  const preventRemove =
    itemCount === 0 || !product.selectedColor || !product.selectedSize;

  return (
    <div className="flex items-center gap-4">
      <button
        disabled={preventRemove}
        onClick={() => removeItem(product)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
          ${
            preventRemove
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-rose-600 text-white hover:bg-rose-700"
          }`}
      >
        Remove
      </button>

      <span className="text-xl font-bold min-w-[30px] text-center">
        {itemCount}
      </span>

      <button
        disabled={preventAdd}
        onClick={() => addItem(product)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
          ${
            preventAdd
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-lime-600 text-white hover:bg-lime-700"
          }`}
      >
        Add to Cart
      </button>
    </div>
  );
}
