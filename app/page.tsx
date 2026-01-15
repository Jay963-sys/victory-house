import Hero from "./components/Home/Hero";
import BentoGrid from "./components/BentoGrid";
import Marquee from "./components/Marquee";
import EventsSection from "./components/EventsSection";
import CurrentSeries from "./components/CurrentSeries";
import Testimonies from "./components/Testimonies";
import SocialGrid from "./components/SocialGrid"; // <--- Import it
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const homeQuery = groq`
  {
    "events": *[_type == "event"] | order(date asc) [0...4] {
      _id, title, category, date, location, image
    },
    "series": *[_type == "series" && isCurrent == true][0] {
      title, subtitle, description, coverImage,
      "recentSermons": *[_type == "sermon" && references(^._id)] | order(date desc)[0...3] {
        title,youtubeUrl, "fileUrl": audioFile.asset->url, date, preacher, "slug": slug.current
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
      <BentoGrid />
      <CurrentSeries data={data.series} />
      <EventsSection events={data.events} />
      <Testimonies items={data.testimonies} />
      <SocialGrid />
    </main>
  );
}
