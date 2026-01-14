import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import EventsCalendar from "../components/EventsCalendar";

const eventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id, title, category, date, location, image
  }
`;

export const revalidate = 60;

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO --- */}
      <section className="relative bg-stone-900 pt-40 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/16.jpg"
            alt="Events Calendar"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            The Calendar.
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            See what's happening at Victory House. Click a date to filter.
          </p>
        </div>
      </section>

      {/* --- INTERACTIVE CALENDAR SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Pass data to the Client Component */}
        <EventsCalendar events={events} />
      </section>
    </main>
  );
}
