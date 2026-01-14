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
            {/* --- UPDATED LOGO LOCKUP TO MATCH NAVBAR --- */}
            <Link href="/" className="flex items-center gap-4 mb-8 group w-fit">
              {/* Logo Image Container */}
              <div className="relative w-12 h-12 bg-white rounded-full p-0.5 shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/rccg.png" // Using the PNG to match Navbar/Hero
                  alt="Victory House Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>

              {/* Stacked Text */}
              <div className="flex flex-col items-start leading-[0.85]">
                {/* Row 1: VICTORY */}
                <span className="font-sans font-bold text-lg uppercase tracking-tight text-green-500 group-hover:text-green-500 transition-colors">
                  Victory House
                </span>

                {/* Row 3: CHICAGO (Red Box) */}
                <span className="bg-[#DA291C] text-white text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 mt-1 shadow-sm rounded-sm">
                  Chicago
                </span>
              </div>
            </Link>
            {/* ------------------------------------------- */}

            <p className="text-stone-500 text-sm leading-relaxed max-w-sm mb-8">
              An unorthodox community of believers dedicated to faith, hope, and
              love. We are building a sanctuary for the broken and a training
              ground for the faithful.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              {[
                {
                  Icon: Instagram,
                  url: "https://www.instagram.com/victoryalltheway",
                },
                {
                  Icon: Youtube,
                  url: "https://www.youtube.com/@RCCGVictoryHouseTV",
                },
                { Icon: Mail, url: "mailto:info@victoryalltheway.org" },
                { Icon: Phone, url: "tel:+13128332383" },
              ].map(({ Icon, url }, i) => (
                <Link
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
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
                  4352 W.Parker Avenue,
                  <br />
                  Chicago, IL 60639
                </span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-green-600 shrink-0" />
                <span>+1 (312) 833-2383</span>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-green-600 shrink-0" />
                <span className="break-all">info@victoryalltheway.org</span>
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
                <span className="block text-stone-400 font-bold mb-1">
                  Sundays
                </span>
                <div className="text-stone-500 text-sm space-y-1">
                  <div className="flex justify-between text-stone-400">
                    <span>Bethel</span> <span>9:00 AM</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>School of Word</span> <span>10:30 AM</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Victory House</span> <span>11:00 AM</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Miracle Service (Last Sun)</span>{" "}
                    <span>11:00 AM</span>
                  </div>
                </div>
              </motion.li>

              <div className="border-t border-white/10 my-2" />

              <motion.li variants={itemVariants}>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400 font-bold">
                    Bible Study Tue (Zoom)
                  </span>
                  <span className="text-stone-400">6:30 PM</span>
                </div>
              </motion.li>

              <motion.li variants={itemVariants}>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-400 font-bold">
                    2nd Saturdays
                  </span>
                  <span className="text-stone-400">7 AM - 5 PM</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">
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
