"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventData {
  isActive: boolean;
  title: string;
  eventDate: string;
  formattedEventDate: string;
  flyer: any;
  description: string;
  registrationLink?: string;
  flyerLink?: string;
}

export default function EventCountdown({ data }: { data: EventData }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [status, setStatus] = useState<"loading" | "upcoming" | "expired">(
    "loading",
  );

  useEffect(() => {
    if (!data?.eventDate) return;

    const calculateTime = () => {
      const difference = +new Date(data.eventDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setStatus("upcoming");
      } else {
        setStatus("expired");
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [data?.eventDate]);

  if (!data?.isActive || status === "expired") return null;

  // Determine the link to use: flyerLink > registrationLink > null
  const imageLink = data.flyerLink || data.registrationLink;

  return (
    <section className="py-20 bg-stone-950 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: TEXT & COUNTDOWN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-xs font-bold uppercase tracking-widest border border-green-600/30">
                Upcoming Event
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              {data.title}
            </h2>

            <p className="text-stone-400 text-lg mb-10 max-w-md leading-relaxed">
              {data.description}
            </p>

            {/* TIMER GRID */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              {data.registrationLink && (
                <a
                  href={data.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-green-900/20"
                >
                  Register Now <ArrowRight size={18} />
                </a>
              )}
              <div className="px-6 py-4 border border-stone-700 text-stone-300 rounded-full flex items-center gap-3">
                <Calendar size={18} className="text-green-500" />
                <span className="text-sm font-medium">
                  {data.formattedEventDate}
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: FLYER IMAGE - OPTIMIZED FOR LANDSCAPE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {data.flyer && (
              <div className="relative w-full rounded-2xl overflow-hidden border-4 md:border-8 border-stone-800 shadow-2xl group">
                {imageLink ? (
                  <a
                    href={imageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    {/* Flyer Image */}
                    <img
                      src={urlFor(data.flyer)
                        .width(1200)
                        .quality(85)
                        .auto("format")
                        .url()}
                      srcSet={`
                        ${urlFor(data.flyer).width(640).quality(85).auto("format").url()} 640w,
                        ${urlFor(data.flyer).width(828).quality(85).auto("format").url()} 828w,
                        ${urlFor(data.flyer).width(1200).quality(85).auto("format").url()} 1200w
                      `}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      alt={data.title}
                      className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <span>View Post</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </a>
                ) : (
                  <>
                    {/* Flyer Image (non-clickable) */}
                    <img
                      src={urlFor(data.flyer)
                        .width(1200)
                        .quality(85)
                        .auto("format")
                        .url()}
                      srcSet={`
                        ${urlFor(data.flyer).width(640).quality(85).auto("format").url()} 640w,
                        ${urlFor(data.flyer).width(828).quality(85).auto("format").url()} 828w,
                        ${urlFor(data.flyer).width(1200).quality(85).auto("format").url()} 1200w
                      `}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      alt={data.title}
                      className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain"
                      loading="eager"
                    />

                    {/* Glossy overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center shadow-inner">
      <span className="text-2xl md:text-4xl font-bold text-white font-mono tabular-nums">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[10px] md:text-xs text-stone-500 uppercase tracking-wider font-medium mt-1">
        {label}
      </span>
    </div>
  );
}
