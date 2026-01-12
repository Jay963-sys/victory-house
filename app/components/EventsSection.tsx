"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";

// Define the shape of the data coming from Sanity
export interface SanityEvent {
  _id: string;
  title: string;
  category: string;
  date: string; // ISO String from Sanity
  location: string;
  image: any;
}

const DEFAULT_PREVIEW_IMAGE =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop";

export default function EventsSection({ events }: { events: SanityEvent[] }) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Helper to format ISO date to readable string
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative" id="events">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4">
              Upcoming <span className="text-orange-600">Gatherings.</span>
            </h2>
            <p className="text-stone-500 max-w-md">
              We don't just attend church; we do life together. Join us for one
              of our upcoming events.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-stone-900 font-bold uppercase tracking-wider text-sm hover:text-orange-600 transition-colors">
            View Full Calendar
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="hidden md:flex gap-12 relative">
          {/* List Side */}
          <div className="w-1/2 flex flex-col z-10">
            {events.map((event, index) => (
              <div
                key={event._id} // Fixed: Use unique ID
                onMouseEnter={() => setHoveredEvent(event._id)}
                onMouseLeave={() => setHoveredEvent(null)}
                className="group relative border-t border-stone-200 py-10 cursor-pointer transition-all duration-300 pr-8"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-2 block">
                    {event.category}
                  </span>
                  <span className="text-stone-400 text-sm font-mono group-hover:text-stone-900 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-4xl font-serif font-bold text-stone-300 group-hover:text-stone-900 transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="mt-4 flex gap-6 text-stone-400 group-hover:text-stone-600 transition-colors">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} /> {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} /> {formatTime(event.date)}
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-stone-200" />
          </div>

          {/* Preview Side (Sticky) */}
          <div className="w-1/2 relative h-[650px] rounded-[2.5rem] overflow-hidden sticky top-24 shadow-2xl shadow-stone-200/50">
            <AnimatePresence mode="wait">
              {hoveredEvent ? (
                (() => {
                  const active = events.find((e) => e._id === hoveredEvent);
                  if (!active) return null;
                  return (
                    <motion.div
                      key={active._id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Use urlFor to get real image string */}
                      <Image
                        src={urlFor(active.image).width(800).url()}
                        width={600}
                        height={800}
                        alt={active.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full p-10">
                        <p className="text-white text-xl font-bold flex items-center gap-3">
                          <MapPin className="text-orange-500" />
                          {active.location}
                        </p>
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                <motion.div
                  key="default"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Image
                    src={DEFAULT_PREVIEW_IMAGE}
                    width={600}
                    height={800}
                    alt="Community"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-10">
                    <p className="font-serif italic text-3xl text-white/90">
                      Life together.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout (Cards) */}
        <div className="md:hidden flex flex-col gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={urlFor(event.image).width(600).url()}
                  width={600}
                  height={800}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-stone-900">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                  {event.title}
                </h3>
                <p className="text-stone-500 text-sm flex items-center gap-2 mb-4">
                  <MapPin size={14} className="text-orange-600" />{" "}
                  {event.location}
                </p>
                <div className="flex gap-4 border-t border-stone-100 pt-4">
                  <p className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Calendar size={16} className="text-stone-400" />{" "}
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Clock size={16} className="text-stone-400" />{" "}
                    {formatTime(event.date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
