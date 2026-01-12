"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Heart, ArrowUpRight, Users } from "lucide-react";
import Image from "next/image";

const Box = ({ children, className, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`bg-stone-100 rounded-3xl relative overflow-hidden group ${className}`}
  >
    {children}
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-300 mb-4">
          Not just a building. <br />
          <span className="text-stone-200 italic">A movement.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[1000px] md:h-[600px]">
        {/* Box 1: Our DNA (Large Square - Left) */}
        <Box
          className="md:col-span-2 md:row-span-2 bg-stone-900 text-white p-8 flex flex-col justify-between"
          delay={0.1}
        >
          <Image
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2400&auto=format&fit=crop"
            width={800}
            height={800}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt="Community"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <Heart className="w-10 h-10 text-orange-500 relative z-10" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Our DNA</h3>
            <p className="text-stone-300 text-lg leading-relaxed max-w-md">
              We exist to be a sanctuary for the broken and a training ground
              for the faithful. Unorthodox in our methods, orthodox in our
              beliefs.
            </p>
          </div>
        </Box>

        {/* Box 2: Service Times (Center Top) - NOW WITH IMAGE */}
        <Box
          className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-center relative"
          delay={0.2}
        >
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop"
            width={600}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Service"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-stone-900/80 group-hover:bg-stone-900/70 transition-colors" />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white">
                <Clock size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-300">
                Weekly
              </span>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-white">Sundays</h4>
              <p className="text-lg text-stone-300">10:00 AM</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <h4 className="text-lg font-bold text-white">Wednesdays</h4>
              <p className="text-sm text-stone-300">6:30 PM (Youth)</p>
            </div>
          </div>
        </Box>

        {/* Box 3: Ministries / Visual (Right Tall) */}
        <Box className="md:col-span-1 md:row-span-2 relative" delay={0.3}>
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
            width={600}
            height={800}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Worship"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <h3 className="text-2xl font-bold leading-tight">
              Join a<br />
              Community
            </h3>
            <button className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-orange-400 transition-colors">
              Find your group <ArrowUpRight size={14} />
            </button>
          </div>
        </Box>

        {/* Box 4: Location (Center Bottom) */}
        <Box className="md:col-span-1 md:row-span-1 relative" delay={0.4}>
          <Image
            src="https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2670&auto=format&fit=crop"
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            alt="Location"
          />
          <div className="absolute inset-0 bg-stone-900/60" />

          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            <MapPin className="text-orange-500" />
            <div>
              <h3 className="font-bold text-xl">Chicago, IL</h3>
              <p className="text-stone-300 text-sm mt-1">4352 W Parker Ave</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-400 uppercase tracking-widest border-b border-orange-400/50 pb-0.5">
                Get Directions
              </div>
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
}
