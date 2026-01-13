"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Clock } from "lucide-react";

const HERO_IMAGES = [
  "/images/10.jpg",
  "/images/16.jpg",
  "/images/5.jpg",
  "/images/3.jpg",
  "/images/13.jpg",
  "/images/9.jpg",
  "/images/21.jpg",
  "/images/4.jpg",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------
  // CLIENT-ONLY MOBILE DETECTION
  // --------------------------------------------------
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  // --------------------------------------------------
  // SCROLL PROGRESS
  // --------------------------------------------------
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
      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          opacity,
          y: mounted && !isMobile ? bgY : 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_IMAGES[currentImage]})`,
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/30 z-5" />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-900/80 to-transparent z-10" />
      </motion.div>

      {/* NOISE */}
      <div
        className="absolute inset-0 z-2 opacity-25 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* CONTENT */}
      <motion.div
        className="
          relative z-10
          flex flex-col justify-center
          min-h-svh
          pt-130 md:pt-35
          pb-12 md:pb-16
          px-6 md:px-12
          max-w-7xl mx-auto
          will-change-transform
        "
        style={{
          y: mounted && !isMobile ? textY : 0,
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-2 w-12 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-green-400 font-mono text-sm tracking-widest uppercase font-bold">
                Welcome To
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-bold text-white leading-[0.9] mb-8"
            >
              RCCG <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-green-600">
                Victory House Chicago.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-stone-100 text-lg md:text-xl max-w-lg leading-relaxed mb-8 font-medium"
            >
              A Christ-centered family, rooted in faith, love, and purpose. Join
              us for worship, the Word, and fellowship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/visit"
                className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-xl"
              >
                Join Us This Sunday
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="bg-stone-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 text-green-400">
                <Clock size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  Sunday Schedule
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-mono font-bold">Bethel Service</span>
                  <span className="font-mono font-bold">9:00 AM</span>
                </div>

                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-mono font-bold">
                    School of the Word
                  </span>
                  <span className="font-mono font-bold">10:30 AM</span>
                </div>

                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-bold text-lg">Victory House</span>
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
