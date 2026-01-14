"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import EventsCalendar from "./EventsCalendar";
// Define the shape of the event data (or import it if you have a types file)
export interface SanityEvent {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: any;
}

export default function EventsSection({ events }: { events: SanityEvent[] }) {
  return (
    <section className="py-24 bg-stone-50" id="events">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4">
              Upcoming <span className="text-green-600">Gatherings.</span>
            </h2>
            <p className="text-stone-500 max-w-md text-lg">
              We don't just attend church; we do life together. Select a date to
              see what is happening.
            </p>
          </div>

          <Link
            href="/events"
            className="group flex items-center gap-2 text-stone-900 font-bold uppercase tracking-wider text-sm hover:text-green-600 transition-colors"
          >
            View Full Calendar
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* --- IMPORTED CALENDAR COMPONENT --- */}
        {/* We pass the events prop down to the component to handle the logic */}
        <EventsCalendar events={events} />
      </div>
    </section>
  );
}
