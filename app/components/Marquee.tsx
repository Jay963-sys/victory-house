"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const SERVICE_TIMES = [
  "Bethel Service (Sundays)  9-10 AM",
  "School of the Word (Sundays) 10:30 AM",
  "Victory House (Sundays) 11 AM - 1 PM",
  "Bible Study (Zoom) Tuesdays 6:30 PM",
  "10hrs Prayer (2nd Sat) 7 AM - 5 PM",
  "Miracle Sunday (Last Sun) 11 AM",
];

export default function Marquee() {
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1500], // Increased travel distance for more text
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35, // Slower duration for readability
          ease: "linear",
        },
      },
    },
  };

  return (
    // Changed bg-orange-600 to bg-green-600
    <div className="relative w-full overflow-hidden bg-green-600 py-4 border-y border-stone-900">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16"
          variants={marqueeVariants}
          animate="animate"
        >
          {/* Loop 4 times to ensure seamless infinite scroll */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-16">
              {SERVICE_TIMES.map((text, index) => (
                <div key={index} className="flex items-center gap-16">
                  <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                    {text}
                  </span>
                  <span className="text-xl md:text-2xl font-serif italic text-stone-900 opacity-50">
                    •
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
