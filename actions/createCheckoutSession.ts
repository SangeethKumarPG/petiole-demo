"use server";

import { imageUrl } from "@/lib/imageUrl";
import { BasketItem } from "@/lib/store/store";
import stripe from "@/lib/stripe";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;

  shipping_fullName: string;
  shipping_street1: string;
  shipping_street2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postalCode: string;
  shipping_country: string;
  shipping_phone: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  const itemsWithoutPrice = items.filter((item) => item.product.price === 0);
  if (itemsWithoutPrice.length > 0) {
    throw new Error("Some items do not have a price");
  }

  const customers = await stripe.customers.list({
    email: metadata.customerEmail,
    limit: 1,
  });

  let customerId: string | undefined =
    customers.data.length > 0 ? customers.data[0].id : undefined;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_creation: customerId ? undefined : "always",
    customer_email: customerId ? undefined : metadata.customerEmail,
    metadata,
    mode: "payment",
    allow_promotion_codes: true,
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
    cancel_url: `${baseUrl}/basket`,
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "aed",
        unit_amount: Math.round(item.product.price! * 100),
        product_data: {
          name: item.product.name ?? "Unnamed Product",
          description: `Color: ${item.product.selectedColor} | Size: ${item.product.selectedSize}`,
          metadata: {
            id: item.product._id,
            color: item.product.selectedColor || "",
            size: item.product.selectedSize || "",
          },
          images: item.product.image
            ? [imageUrl(item.product.image).url()]
            : [],
        },
      },
    })),
  });

  return session.url;
}
