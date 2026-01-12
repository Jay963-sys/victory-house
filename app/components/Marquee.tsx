"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function Marquee() {
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-orange-600 py-4 border-y border-stone-900">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16"
          variants={marqueeVariants}
          animate="animate"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-2xl font-bold text-white uppercase tracking-wider">
                Sunday Service 10:00 AM
              </span>
              <span className="text-2xl font-serif italic text-stone-900">
                •
              </span>
              <span className="text-2xl font-bold text-white uppercase tracking-wider">
                Youth Night Fridays
              </span>
              <span className="text-2xl font-serif italic text-stone-900">
                •
              </span>
              <span className="text-2xl font-bold text-white uppercase tracking-wider">
                Community Outreach
              </span>
              <span className="text-2xl font-serif italic text-stone-900">
                •
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
