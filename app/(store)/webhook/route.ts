// app/(store)/webhook/route.ts
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import Stripe from "stripe";

/* --------------------------------------------------
   METADATA TYPE — must match your checkout metadata
-------------------------------------------------- */
type CheckoutMetadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;

  shipping_fullName?: string;
  shipping_street1?: string;
  shipping_street2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_postalCode?: string;
  shipping_country?: string;
  shipping_phone?: string;

  // fallback fields
  selectedColor?: string;
  selectedSize?: string;

  [key: string]: string | undefined;
};

/* --------------------------------------------------
   WEBHOOK ROUTE — MUST be named export
-------------------------------------------------- */
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new Response(JSON.stringify({ error: "Missing signature" }), {
      status: 400,
    });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ Missing STRIPE_WEBHOOK_SECRET in env");
    return new Response(JSON.stringify({ error: "Missing webhook secret" }), {
      status: 500,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Invalid Stripe signature:", err);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
    });
  }

  console.log("⚡ Stripe event received:", event.type);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await createOrderInSanity(session);

      console.log("✅ Order successfully created in Sanity");
    }
  } catch (err) {
    console.error("❌ Error processing event:", err);
    return new Response(JSON.stringify({ error: "Failed to handle event" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}

/* --------------------------------------------------
   CREATE ORDER IN SANITY — fully typed + safe
-------------------------------------------------- */
async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const md = session.metadata as CheckoutMetadata;

  if (!md) {
    throw new Error("Missing metadata in checkout session");
  }

  const {
    id,
    amount_total,
    currency,
    payment_intent,
    customer,
    total_details,
  } = session;

  /* -------------------------------------------
     Fetch Line Items + Expand Product Metadata
  ------------------------------------------- */
  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  /* -------------------------------------------
     Map Stripe → Sanity Product Format
  ------------------------------------------- */
  const sanityProducts = lineItems.data.map((item) => {
    const product = item.price?.product as Stripe.Product | undefined;

    return {
      _key: crypto.randomUUID(),

      product: {
        _type: "reference",
        _ref: product?.metadata?.id ?? "",
      },

      quantity: item.quantity ?? 1,

      selectedColor:
        product?.metadata?.color || md.selectedColor || "Not specified",

      selectedSize:
        product?.metadata?.size || md.selectedSize || "Not specified",
    };
  });

  /* -------------------------------------------
     Create Order Document in Sanity
  ------------------------------------------- */
  const order = await backendClient.create({
    _type: "orders",

    orderNumber: md.orderNumber,
    customerName: md.customerName,
    email: md.customerEmail,
    clerkUserId: md.clerkUserId,

    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    stripeCustomerId: customer,

    currency: currency ?? "aed",
    totalPrice: amount_total ? amount_total / 100 : 0,

    amountDiscount:
      total_details?.amount_discount
        ? total_details.amount_discount / 100
        : 0,

    products: sanityProducts,

    shippingAddress: {
      fullName: md.shipping_fullName ?? "",
      street1: md.shipping_street1 ?? "",
      street2: md.shipping_street2 ?? "",
      city: md.shipping_city ?? "",
      state: md.shipping_state ?? "",
      postalCode: md.shipping_postalCode ?? "",
      country: md.shipping_country ?? "",
      phone: md.shipping_phone ?? "",
    },

    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
