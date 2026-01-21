// sanity/schemaTypes/upcomingEvent.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "upcomingEvent",
  title: "Upcoming Event (Countdown)",
  type: "document",
  fields: [
    defineField({
      name: "isActive",
      title: "Show on Website?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
    }),
    defineField({
      name: "eventDate",
      title: "Date & Time of Event",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "flyer",
      title: "Event Flyer",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "registrationLink",
      title: "Registration/Link (Optional)",
      type: "url",
    }),
  ],
});
