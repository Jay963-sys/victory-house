import { defineField, defineType } from "sanity";

export default defineType({
  name: "program",
  title: "Major Programs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Program Title (e.g., NIKOS 2026)",
      type: "string",
    }),
    defineField({
      name: "isFeatured",
      title: "Set as Active Program on Website?",
      type: "boolean",
      initialValue: true,
      description:
        "Turn this on to display this program on the /programs page.",
    }),
    defineField({
      name: "about",
      title: "About the Program",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "secondaryText",
      title: "Secondary Text Box (The 'Rest of the Text')",
      description:
        "This text will appear in a nice box right above the flyers and schedule.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "teensFlyer",
      title: "Teens Event Flyer (Saturday)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "youtubePlaylistUrl",
      title: "YouTube Playlist Embed URL",
      description:
        "Paste the YouTube embed URL here (e.g., https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID)",
      type: "url",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      description: "Upload a clean, wide background image here",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
    }),
    defineField({
      name: "flyer",
      title: "Main Flyer",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "startDate",
      title: "Program Start Date & Time (For Countdown)",
      type: "datetime",
    }),
    defineField({
      name: "schedule",
      title: "Event Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day/Date (e.g., Friday, Oct 12)",
              type: "string",
            },
            { name: "time", title: "Time", type: "string" },
            { name: "activity", title: "Activity / Session", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Photos from Past Events",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
