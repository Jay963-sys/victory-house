"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Heart, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Images for the DNA Box slideshow
const DNA_IMAGES = [
  "/images/11.jpg",
  "/images/5.jpg", // Assuming these exist from your hero list
  "/images/13.jpg",
  "/images/16.jpg",
];

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
  const [currentDnaImage, setCurrentDnaImage] = useState(0);

  // Cycle through DNA images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDnaImage((prev) => (prev + 1) % DNA_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-300 mb-4">
          Not just a building. <br />
          <span className="text-stone-200 italic">A movement.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[500px]">
        {/* --- BOX 1: Our DNA (Slideshow) --- */}
        <Box
          className="md:col-span-2 bg-stone-900 text-white p-8 flex flex-col justify-between min-h-[400px]"
          delay={0.1}
        >
          {/* Animated Background Image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentDnaImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={DNA_IMAGES[currentDnaImage]}
                  alt="Community"
                  fill
                  className="object-cover opacity-60"
                />
              </motion.div>
            </AnimatePresence>
            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          </div>

          <Heart className="w-10 h-10 text-green-500 relative z-20" />

          <div className="relative z-20">
            <h3 className="text-3xl font-bold mb-4">Our DNA</h3>
            <p className="text-stone-300 text-lg leading-relaxed max-w-lg">
              We exist to be a sanctuary for the broken and a training ground
              for the faithful. Unorthodox in our methods, orthodox in our
              beliefs.
            </p>
          </div>
        </Box>

        {/* --- BOX 2: Location (Bright Image) --- */}
        <Box className="md:col-span-1 relative min-h-[400px]" delay={0.2}>
          <Image
            src="/images/22.jpg"
            width={600}
            height={400}
            // Removed 'grayscale' and increased brightness by not having a heavy full overlay
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Chicago Location"
          />

          {/* CHANGED: Gradient instead of solid dark overlay. 
              This keeps the top bright and the bottom readable. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-green-500">
              <MapPin size={24} />
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-2">Chicago, IL</h3>
              <p className="text-stone-200 text-base leading-relaxed font-medium">
                4352 W Parker Avenue,
                <br />
                Chicago, Illinois
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=4352+W+Parker+Avenue+Chicago+IL"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-green-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                Get Directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Box>
      </div>
    </section>
  );
}
