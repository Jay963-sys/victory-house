"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

// 1. Define your images here
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop", // Crowd/Worship
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601294281485-2b5a214689dc?q=80&w=764&auto=format&fit=crop", // Worship Leader
  "https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?q=80&w=1171&auto=format&fit=crop", // Community/Gathering
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // 2. Cycle images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // --- Scroll Logic (Unchanged) ---
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  const bgY = useTransform(
    smoothScrollY,
    [0, 1],
    ["0%", isMobile ? "0%" : "18%"]
  );
  const textY = useTransform(
    smoothScrollY,
    [0, 1],
    ["0%", isMobile ? "0%" : "35%"]
  );
  const opacity = useTransform(smoothScrollY, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-stone-900"
    >
      {/* --------------------------------------------------
       * DYNAMIC BACKGROUND LAYER
       * -------------------------------------------------- */}
      <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage} // Key change triggers animation
            initial={{ opacity: 0, scale: 1.1 }} // Start slightly zoomed in
            animate={{ opacity: 1, scale: 1 }} // Zoom out slowly to normal
            exit={{ opacity: 0 }} // Fade out
            transition={{ duration: 2, ease: "easeInOut" }} // Slow, silky transition
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_IMAGES[currentImage]})`,
            }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-black/20 z-10" />
      </motion.div>

      {/* --------------------------------------------------
       * TEXTURE OVERLAY
       * -------------------------------------------------- */}
      <div
        className="absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* --------------------------------------------------
       * CONTENT
       * -------------------------------------------------- */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-orange-500" />
            <span className="text-orange-400 font-mono text-sm tracking-widest uppercase">
              Welcome Home
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] mb-8 drop-shadow-lg"
          >
            Faith. Hope. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Community.
            </span>
          </motion.h1>

          {/* Description + CTA */}
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-stone-200 text-lg md:text-xl max-w-lg leading-relaxed drop-shadow-md"
            >
              We are an unorthodox family of believers. Join us this Sunday at
              10:00 AM for an experience, not just a service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4"
            >
              <Link
                href="/visit"
                className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-lg"
              >
                Plan a Visit
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --------------------------------------------------
       * SCROLL INDICATOR
       * -------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest rotate-90 origin-right translate-x-2">
          Scroll
        </span>
        <div className="h-12 w-[1px] bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute inset-0 w-full h-1/2 bg-orange-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
