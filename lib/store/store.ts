import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: Product & {
    selectedColor?: string | null;
    selectedSize?: string | null;
  };
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: Product & { selectedColor?: string | null; selectedSize?: string | null }) => void;
  removeItem: (product: Product & { selectedColor?: string | null; selectedSize?: string | null }) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string, color?: string | null, size?: string | null) => number;
  getGroupedItems: () => BasketItem[];
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const { selectedColor, selectedSize, variants } = product;
          if (!selectedColor || !selectedSize) return state;

          const variant = variants?.find((v) => v.colorName === selectedColor);
          if (!variant || (variant.stock ?? 0) <= 0) return state;

          const sizeInfo = variant.sizes?.find((s) => s.size === selectedSize);
          if (sizeInfo && (sizeInfo.stock ?? 0) <= 0) return state;

          const existingItem = state.items.find(
            (item) =>
              item.product._id === product._id &&
              item.product.selectedColor === selectedColor &&
              item.product.selectedSize === selectedSize
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity + 1;

            if ((sizeInfo && newQuantity > (sizeInfo.stock ?? 0)) || (!sizeInfo && newQuantity > (variant.stock ?? 0))) {
              return state;
            }

            return {
              items: state.items.map((item) =>
                item.product._id === product._id &&
                item.product.selectedColor === selectedColor &&
                item.product.selectedSize === selectedSize
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),

      removeItem: (product) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            const match =
              item.product._id === product._id &&
              item.product.selectedColor === product.selectedColor &&
              item.product.selectedSize === product.selectedSize;

            if (match) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }

            return acc;
          }, [] as BasketItem[]),
        })),

      clearBasket: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0),

      getItemCount: (productId, color = null, size = null) => {
        const item = get().items.find(
          (item) =>
            item.product._id === productId &&
            item.product.selectedColor === color &&
            item.product.selectedSize === size
        );
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    }
  )
);
