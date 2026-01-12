import Hero from "./components/Home/Hero";
import BentoGrid from "./components/BentoGrid";
import Marquee from "./components/Marquee";
import EventsSection from "./components/EventsSection";
import CurrentSeries from "./components/CurrentSeries";
import MediaGallery from "./components/MediaGallery";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const eventsQuery = groq`
  *[_type == "event"] | order(date asc) [0...4] {
    _id,
    title,
    category,
    date,
    location,
    image
  }
`;

const seriesQuery = groq`
  *[_type == "series" && isCurrent == true][0] {
    title,
    subtitle,
    description,
    coverImage,
    // This part goes and finds sermons that reference THIS series (^._id)
    "recentSermons": *[_type == "sermon" && references(^._id)] | order(date desc)[0...2] {
      title,
      "fileUrl": audioFile.asset->url,
      date,
      preacher,
      "slug": slug.current
    }
  }
`;

// Helper to fetch data
async function getEvents() {
  // revalidate: 30 means it checks for new data every 30 seconds
  return await client.fetch(eventsQuery, {}, { next: { revalidate: 30 } });
}

async function getCurrentSeries() {
  // revalidate: 30 means it checks for new data every 30 seconds
  return await client.fetch(seriesQuery, {}, { next: { revalidate: 30 } });
}

export default async function Home() {
  const events = await getEvents();
  const currentSeries = await getCurrentSeries();

  return (
    <main className="min-h-screen">
      <Hero />
      <Marquee />
      <BentoGrid />
      <EventsSection events={events} />
      <CurrentSeries data={currentSeries} />
      <MediaGallery />
    </main>
  );
}
