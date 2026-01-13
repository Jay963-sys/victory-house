import Hero from "./components/Home/Hero";
import BentoGrid from "./components/BentoGrid";
import Marquee from "./components/Marquee";
import EventsSection from "./components/EventsSection";
import CurrentSeries from "./components/CurrentSeries";
import MediaGallery from "./components/MediaGallery";
import Testimonies from "./components/Testimonies";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const homeQuery = groq`
  {
    "events": *[_type == "event"] | order(date asc) [0...4] {
      _id, title, category, date, location, image
    },
    "series": *[_type == "series" && isCurrent == true][0] {
      title, subtitle, description, coverImage,
      "recentSermons": *[_type == "sermon" && references(^._id)] | order(date desc)[0...2] {
        title, "fileUrl": audioFile.asset->url, date, preacher, "slug": slug.current
      }
    },
    // Added a limit [0...6] so we don't fetch too many if the list grows
    "testimonies": *[_type == "testimony"] | order(_createdAt desc)[0...6] {
      _id, name, role, quote, photo
    }
  }
`;

export const revalidate = 60;

export default async function Home() {
  const data = await client.fetch(homeQuery);

  return (
    <main className="min-h-screen">
      <Hero />
      <Marquee />
      <CurrentSeries data={data.series} />
      <Testimonies items={data.testimonies} />
      <BentoGrid />
      <EventsSection events={data.events} />
      <MediaGallery />
    </main>
  );
}
