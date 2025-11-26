import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",

  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Category Name",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),

    // ✅ CATEGORY IMAGE (Added)
    defineField({
      name: "image",
      type: "image",
      title: "Category Image",
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image", // ✅ Use the new image in previews
    },
  },
});
