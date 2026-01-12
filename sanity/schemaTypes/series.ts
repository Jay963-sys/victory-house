import { defineField, defineType } from "sanity";

export default defineType({
  name: "series",
  title: "Sermon Series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Series Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Book",
      type: "string",
      description: 'e.g. "Book of James"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Series Art (Portrait)",
      type: "image",
      options: { hotspot: true },
    }),
    // This allows them to mark which one is on the homepage
    defineField({
      name: "isCurrent",
      title: "Feature on Homepage?",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
