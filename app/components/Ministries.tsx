"use client";

import { useState, MouseEvent, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  BookOpen,
  Users,
  Heart,
  Droplets,
  Clock,
  Sparkles,
  Sprout,
  Smile,
  X,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

// --- TYPES ---
interface Ministry {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  schedule: string;
  location: string;
  image: string;
  leader?: string;
  theme?: "green" | "orange" | "purple";
}

// --- DATA ---
const ministries: Ministry[] = [
  {
    id: "bible-study",
    name: "Bible Study",
    shortDesc: "Deep dive into scripture.",
    longDesc:
      "Our weekly Bible Study is an interactive session where we dissect the Word of God line by line...",
    schedule: "Tuesdays @ 6:30 PM (Zoom)",
    location: "Online",
    image: "/images/39.jpg",
  },
  {
    id: "prayer",
    name: "Ten Hours Prayers",
    shortDesc: "Intensive spiritual warfare.",
    longDesc:
      "A monthly spiritual marathon dedicated to breaking strongholds...",
    schedule: "2nd Saturdays @ 7:00 AM",
    location: "Church Auditorium",
    image: "/images/40.jpg",
  },
  {
    id: "school-word",
    name: "School of the Word",
    shortDesc: "Foundational teachings.",
    longDesc: "Sunday mornings begin with equipping the saints...",
    schedule: "Sundays @ 10:30 AM",
    location: "Church Auditorium",
    image: "/images/41.jpg",
  },
  {
    id: "singles",
    name: "Singles Group",
    shortDesc: "Connect & grow together.",
    longDesc:
      "A vibrant community for unmarried adults to connect, grow, and navigate life together...",
    schedule: "Monthly Meetups",
    location: "Church Auditorium",
    image: "/images/42.jpg",
  },
  {
    id: "marriage",
    name: "Marriage Group",
    shortDesc: "Building stronger homes.",
    longDesc: "Dedicated to strengthening covenants...",
    schedule: "Quarterly Events",
    location: "Church Auditorium",
    image: "/images/43.jpg",
  },
  {
    id: "youth",
    name: "Youth Church",
    shortDesc: "Next gen on fire.",
    longDesc:
      "We don't do boring. Our Youth Church is a high-energy environment...",
    schedule: "Sundays @ 11:00 AM",
    location: "Church Auditorium",
    image: "/images/44.jpg",
  },
  {
    id: "teens",
    name: "Teenagers Church",
    shortDesc: "Fun, faith, and friends.",
    longDesc: "Navigating teenage years can be tough...",
    schedule: "Sundays @ 11:00 AM",
    location: "Church Auditorium",
    image: "/images/45.jpg",
  },
  {
    id: "baptism",
    name: "Water Baptism",
    shortDesc: "Public declaration of faith.",
    longDesc: "An outward sign of an inward grace...",
    schedule: "Quarterly",
    location: "Church Auditorium",
    image: "/images/46.jpg",
  },
];

const expressions = [
  {
    id: "bethel",
    title: "Young Adults",
    subtitle: "Bethel Church",
    description:
      "A Christ-centered community where young adults are empowered.",
    longDesc: "Bethel is the Young Adults expression of Victory House...",
    time: "Sundays @ 9:00 AM",
    icon: Sprout,
    theme: "green",
    image: "/images/47.jpg",
  },
  {
    id: "heritage",
    title: "Teens Expression",
    subtitle: "Heritage Church",
    description:
      "A vibrant church for teenagers, dedicated to raising a godly heritage.",
    longDesc:
      "Heritage Church is designed specifically for the unique needs of Gen Z...",
    time: "Last Sat @ 11:00 AM",
    icon: Smile,
    theme: "orange",
    image: "/images/48.jpg",
  },
];

// --- 1. SPOTLIGHT CARD WITH BG IMAGE ---
function SpotlightCard({
  children,
  onClick,
  image,
}: {
  children: React.ReactNode;
  onClick: () => void;
  image: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onClick={onClick}
      className="relative group border border-stone-800 bg-stone-900 overflow-hidden rounded-3xl h-full cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={image}
          alt="background"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      </div>

      {/* Spotlight Effect (White Glow on Hover) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full p-8 z-20">{children}</div>
    </div>
  );
}

// --- 2. TILT CARD WITH BG IMAGE ---
function TiltCard({
  children,
  onClick,
  image,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  image: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative cursor-pointer overflow-hidden group ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: "translateZ(0px)" }}
      >
        <Image
          src={image}
          alt="background"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative h-full z-20"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Ministries() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  useEffect(() => {
    if (!selectedItem) return;

    const scrollY = window.scrollY;

    // Lock page
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Unlock page
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [selectedItem]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-24 bg-stone-50 overflow-hidden perspective-1000 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-green-600 font-mono text-xs font-bold uppercase tracking-widest mb-4 block"
          >
            Connect & Grow
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-6"
          >
            Our Programs & Ministries.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-500 leading-relaxed"
          >
            Click any card below to learn more about how we do life together.
          </motion.p>
        </div>

        {/* --- GRID (General Programs) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {ministries.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="h-[320px]" // Fixed height for consistency
            >
              <SpotlightCard
                onClick={() => setSelectedItem(program)}
                image={program.image}
              >
                <div className="flex flex-col h-full pointer-events-none">
                  {/* Icon in Glass Container */}

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-sm text-stone-300 mb-4 line-clamp-2">
                      {program.shortDesc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* --- EXPRESSIONS (Big Cards) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {expressions.map((item, index) => (
            <TiltCard
              key={item.id}
              onClick={() => setSelectedItem(item)}
              image={item.image}
              className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl h-[500px]"
            >
              <div className="relative z-10 flex flex-col h-full pointer-events-none text-white">
                <div className="flex items-start justify-between mb-8">
                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg bg-white/10 backdrop-blur-md border border-white/20 ${
                      item.theme === "green"
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  >
                    <item.icon size={32} />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10">
                    {item.theme === "green" ? "" : ""}
                  </span>
                </div>

                <div className="mt-auto">
                  <p
                    className={`font-mono text-xs font-bold uppercase tracking-widest mb-2 ${
                      item.theme === "green"
                        ? "text-green-400"
                        : "text-orange-400"
                    }`}
                  >
                    {item.subtitle}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-stone-200 text-lg leading-relaxed mb-8 max-w-md">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 pt-6 border-t border-white/20">
                    <Clock size={18} className="text-white/60" />
                    <span className="font-bold text-white">{item.time}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* --- MODAL (unchanged logic) --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer touch-none"
            />

            <motion.div
              layoutId={selectedItem.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-64 w-full shrink-0">
                <Image
                  src={selectedItem.image}
                  fill
                  className="object-cover"
                  alt={selectedItem.name || selectedItem.title}
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 mb-2"
                  >
                    <span className="bg-green-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                      Ministry
                    </span>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-serif font-bold"
                  >
                    {selectedItem.name || selectedItem.title}
                  </motion.h3>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
                      About this Ministry
                    </h4>
                    <p className="text-stone-600 text-lg leading-relaxed">
                      {selectedItem.longDesc || selectedItem.description}
                    </p>
                  </div>

                  <div className="w-full md:w-48 shrink-0 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <Clock size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          When
                        </span>
                      </div>
                      <p className="text-stone-900 font-medium text-sm">
                        {selectedItem.schedule || selectedItem.time}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-green-600 mb-1">
                        <MapPin size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Where
                        </span>
                      </div>
                      <p className="text-stone-900 font-medium text-sm">
                        {selectedItem.location || "Church Auditorium"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
