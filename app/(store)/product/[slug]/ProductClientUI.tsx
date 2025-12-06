"use client";

import { useState } from "react";
import Image from "next/image";
import AddtoBasketButton, { BasketProduct } from "@/components/AddtoBasket";
import { PortableText, PortableTextComponents } from "next-sanity";
import type { ImageCrop, ImageHotspot } from "sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { imageUrl } from "@/lib/imageUrl";
import { getFinalPrice } from "@/lib/pricing";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FetchedProduct } from "./page";

type LooseImage = {
  asset?: { _ref?: string };
  crop?: ImageCrop;
  hotspot?: ImageHotspot;
};

function normalizeImage(
  image: SanityImageSource | null | undefined
): {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  crop?: ImageCrop & { _type: "sanity.imageCrop" };
  hotspot?: ImageHotspot & { _type: "sanity.imageHotspot" };
} | undefined {
  if (!image || typeof image !== "object") return undefined;

  const img = image as LooseImage;

  if (!img.asset || typeof img.asset._ref !== "string") return undefined;

  return {
    _type: "image",
    asset: {
      _ref: img.asset._ref,
      _type: "reference",
    },
    crop: img.crop ? { ...img.crop, _type: "sanity.imageCrop" } : undefined,
    hotspot: img.hotspot ? { ...img.hotspot, _type: "sanity.imageHotspot" } : undefined,
  };
}

export default function ProductClientUI({
  product,
}: {
  product: FetchedProduct;
}): JSX.Element {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const colorVariant =
    selectedColorIndex !== null ? product.variants?.[selectedColorIndex] : null;

  const sizeStock =
    colorVariant?.sizes?.find((s) => s.size === selectedSize)?.stock ?? 0;

  const colorStock = colorVariant?.stock ?? 0;

  const isOutOfStock =
    selectedColorIndex !== null &&
    (colorStock <= 0 || (selectedSize && sizeStock <= 0));

  const canAdd =
    selectedColorIndex !== null && selectedSize !== null && !isOutOfStock;

  const displayImage = colorVariant?.colorImage
    ? imageUrl(colorVariant.colorImage).url()
    : product.image
    ? imageUrl(product.image).url()
    : "";

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description: _, ...productWithoutDescription } = product;

  const basketProduct = {
    ...productWithoutDescription,
    slug: {
      _type: "slug",
      current: product.slug?.current ?? "",
    },
    image: normalizeImage(product.image),
    selectedColor: colorVariant?.colorName ?? null,
    selectedSize,
  } as BasketProduct;

  const portableComponents: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value) return null;

        return (
          <div className="my-6 flex justify-center">
            <Image
              src={imageUrl(value).width(600).height(600).fit("max").url()}
              alt={value.alt || product.name || "Product image"}
              width={600}
              height={600}
              className="rounded-lg object-contain max-h-[350px]"
            />
          </div>
        );
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-brand-card text-brand-text rounded-xl p-6 shadow-lg">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-black/10 cursor-zoom-in">
            {displayImage && (
              <Image
                src={displayImage}
                fill
                alt={product.name}
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-3xl p-4 bg-brand-dark border border-brand-border">
          <DialogTitle className="sr-only">
            Zoomed view of {product.name}
          </DialogTitle>

          <div className="relative w-full aspect-square">
            <Image
              src={displayImage}
              alt={`Zoomed product ${product.name}`}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-text">
            {product.name}
          </h1>
        
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <div className="mt-2 flex flex-col">
              <span className="text-lg text-gray-400 line-through">
                {product.price} AED
              </span>
              <span className="text-2xl font-semibold text-brand-gold">
                {getFinalPrice(product)} AED
              </span>
            </div>
          ) : (
            <p className="text-2xl font-semibold text-brand-gold mt-2">
              {product.price} AED
            </p>
          )}
        </div>


        <div>
          <h3 className="font-semibold mb-2 text-lg text-brand-text">
            Choose Color
          </h3>

          <div className="flex gap-3 flex-wrap">
            {product.variants?.map((variant, index) => {
              const isSelected = selectedColorIndex === index;
              const isOut = variant.stock !== undefined && variant.stock <= 0;

              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedColorIndex(index);
                    setSelectedSize(null);
                  }}
                  className={`
                    px-4 py-2 rounded border-2 text-sm transition-colors
                    ${
                      isSelected
                        ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                        : "border-brand-border text-brand-text"
                    }
                    ${isOut ? "opacity-50" : ""}
                  `}
                >
                  {variant.colorName} {isOut && "(Out)"}
                </button>
              );
            })}
          </div>
        </div>

        {colorVariant && (
          <div>
            <h3 className="font-semibold mb-2 text-lg text-brand-text">
              Choose Size
            </h3>

            <div className="flex gap-3 flex-wrap">
              {colorVariant.sizes?.map((sz, idx) => {
                const isSelected = selectedSize === sz.size;
                const isOut = sz.stock <= 0;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sz.size)}
                    disabled={isOut}
                    className={`
                      px-4 py-2 rounded border-2 text-sm transition
                      ${
                        isSelected
                          ? "border-brand-lime bg-brand-lime/10 text-brand-lime"
                          : "border-brand-border text-brand-text"
                      }
                      ${isOut ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {sz.size} {isOut && "(Out)"}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <AddtoBasketButton product={basketProduct} disabled={!canAdd} />

        <div className="prose prose-invert max-w-none">
          <PortableText
            value={product.description ?? []}
            components={portableComponents}
          />
        </div>
      </div>
    </div>
  );
}