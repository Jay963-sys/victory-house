"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Mic, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define the shape of the data we expect
export interface MediaItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  type: "sermon" | "event" | "series";
  slug?: string;
}

export default function MediaGalleryClient({ items }: { items: MediaItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  // Helper to get icon based on category
  const getIcon = (type: string) => {
    switch (type) {
      case "sermon":
        return <Mic size={18} />;
      case "event":
        return <Calendar size={18} />;
      case "series":
        return <Play size={18} />;
      default:
        return <ArrowUpRight size={18} />;
    }
  };

  return (
    <section className="py-24 bg-stone-100 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none select-none pointer-events-none opacity-[0.03]">
        <h2 className="text-[20vw] font-black text-stone-900 tracking-tighter whitespace-nowrap">
          MEDIA GALLERY
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
              Latest from the <br />
              <span className="italic text-orange-600">Media Team.</span>
            </h2>
          </div>

          <Link
            href="/media"
            className="px-6 py-3 rounded-full border border-stone-300 text-stone-600 font-bold uppercase text-xs tracking-widest hover:bg-stone-900 hover:text-white transition-colors"
          >
            View Full Archive
          </Link>
        </div>

        {/* --- DESKTOP ACCORDION --- */}
        <div className="hidden md:flex h-[500px] gap-2">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer group"
                animate={{ flex: isActive ? 3 : 1 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <Image
                  src={item.image}
                  width={800}
                  height={1000}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className={`absolute inset-0 transition-colors duration-500 ${isActive ? "bg-black/20" : "bg-black/60 group-hover:bg-black/40"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div
                    className={`mb-auto self-end w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-500 ${isActive ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"}`}
                  >
                    {getIcon(item.type)}
                  </div>

                  <motion.div layout className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-orange-400 font-mono text-xs uppercase tracking-widest">
                      <span>{item.category}</span>
                      <span className="w-1 h-1 bg-white rounded-full" />
                      <span className="text-white/60">{item.date}</span>
                    </div>

                    <h3
                      className={`font-serif font-bold text-white leading-tight transition-all duration-500 ${isActive ? "text-4xl" : "text-xl opacity-70"}`}
                    >
                      <span className={isActive ? "" : "line-clamp-2"}>
                        {item.title}
                      </span>
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- MOBILE STACK --- */}
        <div className="md:hidden flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative h-64 rounded-xl overflow-hidden group"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={800}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-widest mb-2">
                  {getIcon(item.type)}
                  <span>{item.category}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
