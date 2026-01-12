"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "About", href: "/about" },
  { label: "Give", href: "/give" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle Scroll Logic
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border-stone-200 py-3"
              : "bg-transparent border-transparent py-6"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <Link
            href="/"
            className="relative z-50 group flex items-center gap-3"
          >
            {/* Church Logo */}
            <Image
              src="/rccg.svg" // or /logo.png
              alt="Victory Parish Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />

            {/* Church Name */}
            <span
              className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300
      ${scrolled || open ? "text-stone-900" : "text-white"}
    `}
            >
              Victory<span className="text-green-500"> Parish</span>
            </span>
          </Link>

          {/* 2. DESKTOP ROLLING NAVIGATION */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              // Text Color Logic
              const textColor = scrolled ? "text-stone-600" : "text-white/80";
              const hoverColor = scrolled ? "text-stone-900" : "text-white";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex flex-col items-center justify-center h-10 px-1"
                >
                  <div className="overflow-hidden h-5">
                    <div
                      className={`flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2`}
                    >
                      {/* Original Text */}
                      <span
                        className={`h-5 flex items-center text-xs font-bold uppercase tracking-[0.2em] ${textColor} ${
                          isActive ? "text-orange-500" : ""
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Duplicate Text (Revealed on Hover) */}
                      <span
                        className={`h-5 flex items-center text-xs font-bold uppercase tracking-[0.2em] ${hoverColor} ${
                          isActive ? "text-orange-500" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>

                  {/* === THE ACTIVE DOT === */}
                  {isActive && (
                    <motion.div
                      layoutId="navDot"
                      // Positioned absolutely below the text
                      className="absolute bottom-0 w-1.5 h-1.5 bg-orange-500 rounded-full"
                      // Center the dot horizontally
                      style={{ left: "50%", x: "-50%" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. CTA & BURGER */}
          <div className="flex items-center gap-6 z-50">
            <Link
              href="/visit"
              className={`hidden md:inline-flex px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105
                ${
                  scrolled || open
                    ? "bg-stone-900 text-white hover:bg-orange-600"
                    : "bg-white text-stone-900 hover:bg-stone-200"
                }
              `}
            >
              Visit
            </Link>

            {/* Premium Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2 group"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className={`w-8 h-0.5 block transition-colors ${
                  scrolled || open ? "bg-stone-900" : "bg-white"
                }`}
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className={`w-8 h-0.5 block transition-colors ${
                  scrolled || open ? "bg-stone-900" : "bg-white"
                }`}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className={`w-8 h-0.5 block transition-colors ${
                  scrolled || open ? "bg-stone-900" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 4. MOBILE MENU (Unchanged) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-stone-950 z-40 flex flex-col justify-center px-6 pt-20"
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'url("https://grainy-gradients.vercel.app/noise.svg")',
              }}
            ></div>

            <nav className="flex flex-col gap-6 relative z-10 max-w-lg mx-auto w-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-stone-800 pb-4"
                  >
                    <span className="text-xs font-bold font-mono text-orange-500">
                      0{index + 1}
                    </span>
                    <span className="text-4xl md:text-5xl font-serif text-white group-hover:text-orange-500 group-hover:translate-x-4 transition-all duration-300">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <Link
                  href="/visit"
                  onClick={() => setOpen(false)}
                  className="w-full block bg-orange-600 text-white text-center py-4 rounded-full text-lg font-bold uppercase tracking-widest"
                >
                  Plan a visit
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
