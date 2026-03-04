"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// 1. UPDATED NAV ITEMS ARRAY WITH SUB-ITEMS
const navItems = [
  { label: "Home", href: "/" },
  { label: "Sermons", href: "/sermons" },
  {
    label: "Events",
    href: "#", // Parent acts as a toggle, not a link
    subItems: [
      { label: "Upcoming Events", href: "/events" },
      { label: "Special Programs", href: "/programs" },
    ],
  },
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
              // 2. CHECK IF ACTIVE (Includes checking sub-items)
              const isActive =
                pathname === item.href ||
                item.subItems?.some((sub) => pathname === sub.href);
              const baseColor = scrolled ? "text-stone-600" : "text-white/90";
              const hoverColor = scrolled ? "text-stone-900" : "text-white";

              // 3. RENDER DROPDOWN FOR ITEMS WITH SUB-ITEMS
              if (item.subItems) {
                return (
                  <div
                    key={item.label}
                    className="relative group flex flex-col items-center py-6 cursor-default"
                  >
                    <span
                      className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors ${baseColor} ${
                        isActive ? "text-green-500" : ""
                      } group-hover:${hoverColor}`}
                    >
                      {item.label}{" "}
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-300"
                      />
                    </span>

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-2 w-1 h-1 bg-green-500 rounded-full"
                      />
                    )}

                    {/* The Dropdown Card */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-stone-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 flex flex-col overflow-hidden">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-green-600 hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // STANDARD RENDER FOR NORMAL LINKS
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group flex flex-col items-center py-6"
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
                      className="absolute bottom-2 w-1 h-1 bg-green-500 rounded-full"
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
            className="fixed inset-0 bg-stone-950 z-40 overflow-y-auto flex flex-col items-center justify-start px-6 pt-32 pb-12"
          >
            <nav className="flex flex-col gap-6 w-full max-w-md text-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="border-b border-stone-800 pb-4"
                >
                  {/* 4. RENDER MOBILE NESTED LINKS */}
                  {item.subItems ? (
                    <div className="flex flex-col gap-4 items-center">
                      <span className="text-sm font-mono text-green-700 uppercase tracking-widest">
                        {item.label}
                      </span>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="text-4xl font-serif text-white hover:text-green-500 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-center gap-4"
                    >
                      <span className="text-4xl font-serif text-white hover:text-green-500 transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  )}
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
