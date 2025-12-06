import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,

  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Default Product Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discountPercentage",
      title: "Discount (%)",
      type: "number",
      description: "Leave empty or 0 for no discount",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),

    // ❌ Remove "stock" here — stock must be per color
    // defineField({ name: 'stock', ... })

    // *******************************
    // COLOR VARIANTS WITH STOCK
    // *******************************
    defineField({
      name: "variants",
      title: "Color Variants",
      type: "array",
      of: [
        {
          type: "object",
          name: "colorVariant",
          fields: [
            defineField({
              name: "colorName",
              title: "Color Name (text)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "colorImage",
              title: "Image for this color",
              type: "image",
              options: { hotspot: true },
            }),

            // Stock per color
            defineField({
              name: "stock",
              title: "Stock for this color",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),

            defineField({
              name: "sizes",
              title: "Available Sizes",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "size",
                      title: "Size",
                      type: "string",
                    }),
                    defineField({
                      name: "stock",
                      title: "Stock for this size",
                      type: "number",
                      validation: (Rule) => Rule.min(0),
                    }),
                  ],
                },
              ],
            }),
          ],

          preview: {
            select: {
              title: "colorName",
              media: "colorImage",
            },
          },
        },
      ],
    }),
  ],
});
