"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar as CalendarIcon,
  ArrowUpRight,
  Clock,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
export interface SanityEvent {
  _id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: any;
}

const DEFAULT_PREVIEW_IMAGE = "/images/22.jpg"; // Fallback image

export default function EventsCalendar({ events }: { events: SanityEvent[] }) {
  // --- STATE ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  // --- CALENDAR MATH ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // --- ACTIONS ---
  const handleReset = () => {
    setSelectedDate(null);
    setCurrentDate(new Date()); // Reset calendar view to today
  };

  // --- FILTERING ---
  const hasEvent = (day: Date) =>
    events.some((event) => isSameDay(parseISO(event.date), day));

  const filteredEvents = selectedDate
    ? events.filter((event) => isSameDay(parseISO(event.date), selectedDate))
    : events; // Show all upcoming if no date selected

  // --- PREVIEW LOGIC ---
  const activeEvent =
    (hoveredEventId && events.find((e) => e._id === hoveredEventId)) ||
    (selectedDate && filteredEvents.length > 0 ? filteredEvents[0] : null);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
      {/* --- COLUMN 1: THE CALENDAR WIDGET (Fixed Width) --- */}
      <div className="w-full lg:w-[350px] flex-shrink-0">
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif text-stone-900">
              {format(currentDate, "MMMM yyyy")}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-1 hover:bg-stone-100 rounded-full transition-colors text-stone-500 hover:text-stone-900"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-stone-100 rounded-full transition-colors text-stone-500 hover:text-stone-900"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={`${day}-${index}`}
                className="text-[10px] font-bold text-stone-400 uppercase tracking-widest py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isDayToday = isToday(day);
              const dayHasEvent = hasEvent(day);

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "relative h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                    !isCurrentMonth && "text-stone-300",
                    isCurrentMonth && "text-stone-700 hover:bg-stone-100",
                    isSelected &&
                      "bg-stone-900 text-white hover:bg-stone-800 shadow-md",
                    isDayToday &&
                      !isSelected &&
                      "text-green-600 font-bold bg-green-50"
                  )}
                >
                  {format(day, "d")}
                  {dayHasEvent && (
                    <span
                      className={cn(
                        "absolute bottom-1 w-1 h-1 rounded-full",
                        isSelected ? "bg-green-400" : "bg-green-600"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 mx-auto text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-green-600 transition-colors"
            >
              <RotateCcw size={12} />
              Reset Calendar
            </button>
          </div>
        </div>
      </div>

      {/* --- COLUMN 2: THE LIST (Flexible Width) --- */}
      <div className="flex-grow min-w-0 w-full">
        <div className="mb-4 flex items-baseline justify-between">
          <h4 className="text-xs font-bold uppercase text-stone-400 tracking-widest pl-2">
            {selectedDate
              ? `Events on ${format(selectedDate, "MMM do")}`
              : "Next 3 Events"}
          </h4>
        </div>

        <div className="space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.slice(0, 3).map((event, index) => (
              <motion.div
                key={event._id}
                onMouseEnter={() => setHoveredEventId(event._id)}
                onMouseLeave={() => setHoveredEventId(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-300",
                  hoveredEventId === event._id
                    ? "border-green-300 shadow-md scale-[1.01]"
                    : "border-stone-200 shadow-sm hover:border-green-200"
                )}
              >
                {/* Mobile Image (Hidden on Desktop) */}
                {event.image && (
                  <div className="block lg:hidden mb-4 rounded-xl overflow-hidden relative h-48 w-full shadow-sm">
                    <Image
                      src={urlFor(event.image).width(600).url()}
                      fill
                      alt={event.title}
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded">
                    {event.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-green-500 transition-colors" />
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-green-700 transition-colors">
                  {event.title}
                </h3>

                {/* Event Details Grid */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-stone-500 text-xs font-medium">
                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <CalendarIcon
                      size={14}
                      className="text-green-500 shrink-0"
                    />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  {/* Time */}
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-green-500 shrink-0" />
                    {new Date(event.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                  {/* Location - ADDED HERE */}
                  <div className="flex items-center gap-2 col-span-1 md:col-span-2">
                    <MapPin size={14} className="text-green-500 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-stone-500 text-sm">
              No events found for this selection.
            </div>
          )}
        </div>
      </div>

      {/* --- COLUMN 3: THE PREVIEW (Desktop Only) --- */}
      <div className="hidden lg:block w-[300px] flex-shrink-0">
        <div className="sticky top-24">
          <div className="relative h-[300px] w-full rounded-3xl overflow-hidden bg-stone-900 shadow-xl border-4 border-white">
            <AnimatePresence mode="wait">
              {activeEvent ? (
                <motion.div
                  key={activeEvent._id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {activeEvent.image ? (
                    <Image
                      src={urlFor(activeEvent.image).width(600).url()}
                      fill
                      className="object-cover"
                      alt={activeEvent.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-800">
                      <CalendarIcon className="text-white/20" size={48} />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Text Info (Desktop Preview) */}
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <p className="text-white font-serif font-bold text-lg leading-tight mb-1">
                      {activeEvent.title}
                    </p>
                    <p className="text-stone-300 text-xs flex items-center gap-1">
                      <MapPin size={12} className="text-green-500" />
                      {activeEvent.location}
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* Default Image (When no hover & no selection) */
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={DEFAULT_PREVIEW_IMAGE}
                    fill
                    className="object-cover"
                    alt="Community"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
