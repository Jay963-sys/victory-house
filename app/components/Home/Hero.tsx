"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh w-full overflow-hidden bg-stone-900"
    >
      {/* BACKGROUND CONTAINER */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform bg-stone-900"
        style={{
          opacity,
          y: mounted && !isMobile ? bgY : 0,
        }}
      >
        {/* --- REPLACED IMAGES WITH VIDEO --- */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            // Optional: Add a poster image while video loads
            poster="/images/10.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            {/* Make sure to put your video file in public/videos/ */}
            <source src="/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* LIGHT / DARK OVERLAYS (Crucial for text readability) */}
        {/* Darkens the video slightly so white text pops */}
        <div className="absolute inset-0 bg-black/40 z-5" />

        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent z-10" />
      </motion.div>

      {/* NOISE TEXTURE */}
      <div
        className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* CONTENT */}
      <motion.div
        className="
            relative z-30
            flex flex-col justify-center
            min-h-screen
            pt-32 md:pt-40 lg:pt-32 
            pb-12 md:pb-16
            px-6 md:px-12
            max-w-7xl mx-auto
            will-change-transform
        "
        style={{
          y: mounted && !isMobile ? textY : 0,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-2 w-12 bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
              <span
                className="
                  text-green-400
                  font-mono text-sm font-bold uppercase tracking-widest
                  bg-black/20 backdrop-blur-sm
                  px-2 py-0.5 rounded
                "
              >
                Welcome To
              </span>
            </motion.div>

            {/* --- LOGO & TEXT LOCKUP START --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-row items-center gap-4 md:gap-6 mb-10"
            >
              {/* 1. RCCG Logo */}
              <div className="relative w-24 h-24 md:w-40 md:h-40 shrink-0 bg-white rounded-full shadow-2xl p-1 border-4 border-white/20">
                <Image
                  src="/rccg.png"
                  alt="RCCG Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* --- Text Stack --- */}
              <div className="flex flex-col justify-center items-start">
                <div className="inline-block">
                  <h1 className="text-4xl md:text-6xl font-sans font-bold text-green-500 uppercase leading-[0.9] tracking-tight drop-shadow-md">
                    Victory <br /> House
                  </h1>

                  <div
                    className="
                      bg-[#DA291C] text-white
                      text-3xl md:text-5xl
                      font-sans font-bold uppercase
                      px-4 py-1.5 mt-2
                      leading-none tracking-widest
                      shadow-lg
                      rounded-sm
                      w-full text-center
                    "
                  >
                    Chicago
                  </div>
                </div>
              </div>
            </motion.div>
            {/* --- LOGO & TEXT LOCKUP END --- */}

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="
                text-stone-100
                text-lg md:text-xl
                max-w-lg
                leading-relaxed mb-8
                font-medium
                drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]
              "
            >
              Committed to preaching God's Word and proclaiming God's name.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/visit"
                className="
                  inline-flex items-center justify-center
                  px-9 py-4 rounded-full
                  font-bold text-base
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  bg-green-600 text-white
                  hover:bg-green-700
                  focus:outline-none focus:ring-4
                  focus:ring-green-700
                "
              >
                Join Us This Sunday
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — SERVICE TIMES */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-5"
          >
            <div
              className="
                bg-stone-950/70 text-stone-100
                backdrop-blur-md
                border border-white/10
                rounded-2xl
                p-6 md:p-8
                shadow-2xl
              "
            >
              <div className="flex items-center gap-3 mb-6 text-green-400">
                <Clock size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  Sunday Schedule
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="font-mono font-bold">Bethel Service</span>
                  <span className="font-mono font-bold">9:00 AM</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="font-mono font-bold">
                    School of the Word
                  </span>
                  <span className="font-mono font-bold">10:30 AM</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="font-bold text-lg text-green-400">
                    Victory House
                  </span>
                  <span className="font-mono font-bold">11:00 AM</span>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">
                    Last Sunday of Month
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono font-bold">Miracle Sunday</span>
                    <span className="font-mono font-bold">11:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
