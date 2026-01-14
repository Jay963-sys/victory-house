"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Ministries", href: "/ministries" },
  { label: "About", href: "/about" },
  { label: "Connect", href: "/connect" },
  { label: "Give", href: "/give" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lastScroll = useRef(false);

  /* --------------------------------------------
   * Scroll detection
   * ------------------------------------------ */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 50;
      if (next !== lastScroll.current) {
        lastScroll.current = next;
        setScrolled(next);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --------------------------------------------
   * Body scroll lock
   * ------------------------------------------ */
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          will-change-transform
          transition-all duration-300
          ${
            open
              ? "bg-white border-b border-stone-200 py-3 shadow-md"
              : scrolled
                ? "bg-white/95 backdrop-blur-md border-b border-stone-200 py-3 shadow-sm"
                : "bg-gradient-to-b from-black/60 to-transparent border-transparent py-4 md:py-6"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          {/* LOGO LOCKUP */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-3 group"
          >
            {/* Logo Container */}
            <div
              className={`relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full p-0.5 shadow-sm transition-transform group-hover:scale-105 ${scrolled || open ? "shadow-md" : ""}`}
            >
              <Image
                src="/rccg.png"
                alt="Victory Parish Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>

            {/* Text Stack */}
            <div className="flex flex-col leading-none">
              <span
                className={`font-sans font-bold text-lg md:text-xl uppercase tracking-tight transition-colors ${
                  scrolled || open ? "text-green-700" : "text-green-500"
                }`}
              >
                Victory House
              </span>
              <span
                className={`
                text-[10px] md:text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 w-fit -mt-0.5 shadow-sm
                ${
                  scrolled || open
                    ? "bg-[#DA291C] text-white"
                    : "bg-[#DA291C] text-white"
                }
              `}
              >
                Chicago
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const baseColor = scrolled ? "text-stone-600" : "text-white/90";
              const hoverColor = scrolled ? "text-stone-900" : "text-white";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group flex flex-col items-center"
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${baseColor} ${
                      isActive ? "text-green-500" : ""
                    } group-hover:${hoverColor}`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 w-1 h-1 bg-green-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + BURGER */}
          <div className="flex items-center gap-6 z-50">
            <Link
              href="/visit"
              className={`hidden md:inline-flex px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm hover:shadow-md
                ${
                  scrolled || open
                    ? "bg-stone-900 text-white hover:bg-green-600"
                    : "bg-white text-stone-900 hover:bg-stone-100"
                }
              `}
            >
              Visit
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className={`w-7 h-0.5 rounded-full ${
                  scrolled || open ? "bg-stone-900" : "bg-white"
                }`}
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className={`w-7 h-0.5 rounded-full ${
                  scrolled || open ? "bg-stone-900" : "bg-white"
                }`}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className={`w-7 h-0.5 rounded-full ${
                  scrolled || open ? "bg-stone-900" : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            // FIX APPLIED HERE:
            // 1. overflow-y-auto (allows scrolling on small screens)
            // 2. justify-start (starts content from top instead of center)
            // 3. pt-32 (adds padding so links aren't hidden behind the logo)
            className="fixed inset-0 bg-stone-950 z-40 overflow-y-auto flex flex-col items-center justify-start px-6 pt-32 pb-12"
          >
            <nav className="flex flex-col gap-6 w-full max-w-md text-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-center gap-4 border-b border-stone-800 pb-4"
                  >
                    <span className="text-sm font-mono text-green-500">
                      0{index + 1}
                    </span>
                    <span className="text-4xl font-serif text-white hover:text-green-500 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/visit"
                onClick={() => setOpen(false)}
                className="mt-8 block bg-green-600 text-white text-center py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-green-700 shadow-lg"
              >
                Plan a visit
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
