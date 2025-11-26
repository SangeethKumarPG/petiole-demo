import { defineArrayMember, defineField, defineType } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const orderType = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  icon: BasketIcon,

  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
    }),

    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),

    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),

    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
    }),

    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
    }),

    /* -----------------------
       SHIPPING ADDRESS
    ------------------------*/
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({ name: "fullName", title: "Full Name", type: "string" }),
        defineField({ name: "street1", title: "Street 1", type: "string" }),
        defineField({ name: "street2", title: "Street 2", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
      ],
    }),

    /* -----------------------
       PRODUCT LIST
    ------------------------*/
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              weak: true,
            }),

            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
            }),

            defineField({
              name: "selectedColor",
              title: "Selected Color",
              type: "string",
            }),

            defineField({
              name: "selectedSize",
              title: "Selected Size",
              type: "string",
            }),
          ],

          preview: {
            select: {
              title: "product.name",
              quantity: "quantity",
              color: "selectedColor",
              size: "selectedSize",
              media: "product.image",
              price: "product.price",
            },

            prepare({ title, quantity, color, size, price, media }) {
              return {
                title: `${quantity}× ${title}`,
                subtitle: `${color} | ${size} | ${(price * quantity).toFixed(2)} AED`,
                media,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),

    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),

    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
    }),
  ],

  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
    },
    prepare({ name, amount, currency, orderId }) {
      return {
        title: `${name} - ${orderId}`,
        subtitle: `Total: ${amount} ${currency}`,
        media: BasketIcon,
      };
    },
  },
});
