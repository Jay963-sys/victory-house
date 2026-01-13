"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  // Animation variants for staggering the list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-stone-950 text-white pt-24 pb-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* TOP SECTION: CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Ready to visit?
            </h2>
            <p className="text-stone-400 text-lg">
              We can't wait to meet you. Plan your visit today and let us know
              you're coming.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <Link
              href="/visit"
              className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-stone-950 transition-colors duration-300"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>

        {/* MIDDLE SECTION: GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24"
        >
          {/* Column 1: Brand (Span 4) */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-3 font-serif text-3xl font-bold tracking-tight mb-6"
            >
              <Image
                src="/rccg.svg"
                alt="Victory House Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <span>
                Victory<span className="text-green-600"> House</span>
              </span>
            </Link>

            <p className="text-stone-500 text-sm leading-relaxed max-w-sm mb-8">
              An unorthodox community of believers dedicated to faith, hope, and
              love. We are building a sanctuary for the broken and a training
              ground for the faithful.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {["Sermons", "Events", "Media", "About", "Give"].map((item) => (
                <motion.li key={item} variants={itemVariants}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "")}`} // simple url generator
                    className="text-stone-400 hover:text-green-500 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-stone-400">
              <motion.li
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                <span>
                  4352 W Parker Avenue,
                  <br />
                  Chicago, Illinois
                </span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-green-600 shrink-0" />
                <span>+1 (773) 123-4567</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-green-600 shrink-0" />
                <span className="break-all">info@victoryhousechicago.org</span>
              </motion.li>
            </ul>
          </div>

          {/* Column 4: Service Times (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">
              Service Times
            </h4>
            <ul className="space-y-4">
              <motion.li variants={itemVariants}>
                <span className="block text-white font-bold mb-1">Sundays</span>
                <div className="text-stone-500 text-sm space-y-1">
                  <div className="flex justify-between text-white">
                    <span>Bethel</span> <span>9:00 AM</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>School of Word</span> <span>10:30 AM</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Victory House</span> <span>11:00 AM</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Miracle Service (Last Sun)</span>{" "}
                    <span>11:00 AM</span>
                  </div>
                </div>
              </motion.li>

              <div className="border-t border-white/10 my-2" />

              <motion.li variants={itemVariants}>
                <div className="flex justify-between text-sm">
                  <span className="text-white font-bold">
                    Bible Study Tue (Zoom)
                  </span>
                  <span className="text-white-500">6:30 PM</span>
                </div>
              </motion.li>

              <motion.li variants={itemVariants}>
                <div className="flex justify-between text-sm">
                  <span className="text-white font-bold">2nd Saturdays</span>
                  <span className="text-white-500">7 AM - 5 PM</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white-600 mt-1">
                  10 Hours Prayer
                </div>
              </motion.li>
            </ul>
          </div>
        </motion.div>

        {/* BOTTOM SECTION: COPYRIGHT & CREDIT */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <p>
            &copy; {new Date().getFullYear()} Victory House. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-stone-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* GIANT BACKGROUND TEXT */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none select-none pointer-events-none">
        <h1 className="text-[18vw] font-black text-stone-900/50 text-center tracking-tighter -mb-[4vw] mix-blend-overlay">
          VICTORY HOUSE
        </h1>
      </div>
    </footer>
  );
}
