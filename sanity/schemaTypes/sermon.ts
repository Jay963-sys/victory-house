import { defineField, defineType } from "sanity";
import { Disc } from "lucide-react"; // Optional icon

export default defineType({
  name: "sermon",
  title: "Sermons",
  type: "document",
  icon: Disc,
  fields: [
    defineField({
      name: "title",
      title: "Sermon Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description: "Click generate to create the URL friendly version",
    }),
    defineField({
      name: "preacher",
      title: "Preacher Name",
      type: "string",
      initialValue: "Pastor Emmanuel", // Default value
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    // Replace the old 'string' field with this 'reference' field
    defineField({
      name: "series",
      title: "Series",
      type: "reference", // <--- This creates the link
      to: [{ type: "series" }], // <--- It points to the 'series' document type
      description: "Which series does this sermon belong to?",
    }),
    // THE CRITICAL PART: AUDIO UPLOAD
    defineField({
      name: "audioFile",
      title: "Audio Recording (MP3)",
      type: "file",
      options: {
        accept: "audio/*",
      },
    }),
    // COVER ART
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true, // Allows them to crop the center
      },
    }),
    defineField({
      name: "isCurrent",
      title: "Feature on Homepage?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Paste the full YouTube link (e.g. https://www.youtube.com/watch?v=...)",
    }),
  ],
});
