import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "orders" && clerkUserId == $userId]
      | order(orderDate desc) {
        _id,
        orderNumber,
        clerkUserId,
        customerName,
        email,
        stripeCheckoutSessionId,
        stripePaymentIntentId,
        stripeCustomerId,
        currency,
        status,
        totalPrice,
        amountDiscount,
        orderDate,
  
        shippingAddress {
          fullName,
          street1,
          street2,
          city,
          state,
          postalCode,
          country,
          phone
        },
  
        products[] {
          quantity,
          selectedColor,
          selectedSize,
          product->{
            _id,
            name,
            price,
            image,
            "slug": slug.current,
            variants
          }
        }
      }
  `);
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId }
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
