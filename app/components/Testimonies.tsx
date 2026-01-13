"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  photo: any;
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If no testimonials exist yet, hide the section
  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-500 font-mono text-sm tracking-widest uppercase mb-4 block"
            >
              Testimonies
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold leading-tight"
            >
              Real People. <br />
              <span className="text-stone-500 italic">Real Change.</span>
            </motion.h2>
          </div>

          {/* Scroll Buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() =>
                containerRef.current?.scrollBy({
                  left: -400,
                  behavior: "smooth",
                })
              }
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() =>
                containerRef.current?.scrollBy({
                  left: 400,
                  behavior: "smooth",
                })
              }
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-green-600 hover:border-green-600 hover:text-white transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="min-w-[85vw] md:min-w-[400px] snap-center bg-stone-800 rounded-3xl p-8 md:p-10 relative group border border-white/5 hover:border-green-500/30 transition-colors"
            >
              <Quote className="w-10 h-10 text-green-600 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />

              <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-8 font-serif">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-stone-700 group-hover:border-green-500 transition-colors bg-stone-600">
                  {item.photo ? (
                    <Image
                      src={urlFor(item.photo).width(100).height(100).url()}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Spacer to allow scrolling to the very end */}
          <div className="min-w-[5vw]" />
        </div>
      </div>
    </section>
  );
}
