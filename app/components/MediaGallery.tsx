import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import MediaGalleryClient, { MediaItem } from "./MediaGalleryClient";
import { urlFor } from "@/sanity/lib/client";

const mixedMediaQuery = groq`
  {
    "series": *[_type == "series" && isCurrent == true][0] {
      _id, title, "date": _createdAt, coverImage
    },
    "event": *[_type == "event" && date >= now()] | order(date asc)[0] {
      _id, title, date, image
    },
    "sermons": *[_type == "sermon"] | order(date desc)[0...2] {
      _id, title, date, "seriesImage": series->coverImage
    }
  }
`;

export default async function MediaGallery() {
  const data = await client.fetch(
    mixedMediaQuery,
    {},
    { next: { revalidate: 3600 } }
  );
  const items: MediaItem[] = [];

  // Helper to safely get image URL
  const getImageUrl = (source: any) => {
    return source ? urlFor(source).width(800).url() : "";
  };

  // 1. Add Current Series
  if (data.series) {
    items.push({
      id: data.series._id,
      title: data.series.title,
      category: "Current Series",
      date: "Latest Sermon Series",
      type: "series",
      image: getImageUrl(data.series.coverImage),
    });
  }

  // 2. Add Upcoming Event
  if (data.event) {
    items.push({
      id: data.event._id,
      title: `Upcoming: ${data.event.title}`,
      category: "Event",
      date: new Date(data.event.date).toLocaleDateString(),
      type: "event",
      image: getImageUrl(data.event.image),
    });
  }

  // 3. Add Latest Sermons
  if (data.sermons) {
    data.sermons.forEach((sermon: any) => {
      items.push({
        id: sermon._id,
        title: sermon.title,
        category: "Sermon",
        date: new Date(sermon.date).toLocaleDateString(),
        type: "sermon",
        image: getImageUrl(sermon.seriesImage),
      });
    });
  }

  return <MediaGalleryClient items={items} />;
}
