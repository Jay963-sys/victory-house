import { defineField, defineType } from "sanity";
import { Quote } from "lucide-react";

export default defineType({
  name: "testimony",
  title: "Testimony",
  type: "document",
  icon: Quote,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Description",
      type: "string",
      description: "e.g. 'Member since 2023' or 'Youth Ministry'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
