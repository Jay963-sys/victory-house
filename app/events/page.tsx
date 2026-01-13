import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Calendar, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Query: Get ALL future events, sorted by date
const eventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    category,
    date,
    location,
    image,
    description 
  }
`;

export const revalidate = 3600;

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO --- */}
      <section className="relative bg-stone-900 pt-40 pb-20 px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/16.jpg"
            alt="Events Calendar"
            fill
            className="object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/60 to-transparent" />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            The Calendar.
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            From Sunday Service to Youth Nights, everything happening at Victory
            House.
          </p>
        </div>
      </section>

      {/* --- EVENTS LIST --- */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event: any) => {
              const eventDate = new Date(event.date);

              return (
                <div
                  key={event._id}
                  // CHANGED: Orange hover border -> Green
                  className="group relative bg-white rounded-2xl p-6 md:p-10 border border-stone-200 hover:border-green-200 transition-all hover:shadow-xl flex flex-col md:flex-row gap-8 items-start md:items-center"
                >
                  {/* Date Badge */}
                  {/* CHANGED: Orange hover bg -> Green */}
                  <div className="shrink-0 w-20 h-20 bg-stone-100 rounded-2xl flex flex-col items-center justify-center border border-stone-200 group-hover:bg-green-50 group-hover:border-green-100 transition-colors">
                    {/* CHANGED: Red text -> Green text for brand consistency */}
                    <span className="text-green-600 font-bold uppercase text-xs tracking-wider">
                      {eventDate.toLocaleString("default", { month: "short" })}
                    </span>
                    <span className="text-3xl font-serif font-bold text-stone-900">
                      {eventDate.getDate()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="grow">
                    <div className="flex items-center gap-3 mb-2">
                      {/* CHANGED: Orange hover badge -> Green */}
                      <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-widest group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                        {event.category || "General"}
                      </span>
                    </div>

                    {/* CHANGED: Orange hover text -> Green */}
                    <h3 className="text-3xl font-serif font-bold text-stone-900 mb-3 group-hover:text-green-600 transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-stone-500 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* CHANGED: Orange icon -> Green */}
                        <Clock size={16} className="text-green-500" />
                        {eventDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* CHANGED: Orange icon -> Green */}
                        <MapPin size={16} className="text-green-500" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <Calendar className="mx-auto h-12 w-12 text-stone-300 mb-4" />
            <h3 className="text-lg font-bold text-stone-900">
              No upcoming events
            </h3>
            <p className="text-stone-500">Check back soon for updates.</p>
          </div>
        )}
      </section>
    </main>
  );
}
