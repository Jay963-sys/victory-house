"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Coffee,
  Baby,
  Music,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/31.jpg" // Local image for speed and consistency
            fill
            className="object-cover"
            alt="Welcome to Victory House"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Welcome Home.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Thinking about visiting? We can't wait to meet you. Here is
            everything you need to know to make your first visit easy.
          </motion.p>
        </div>
      </section>

      {/* --- THE BASICS (Times & Location) --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box 1: Times */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
              <Clock size={28} />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                Service Times
              </h3>
              <p className="text-stone-500 mb-4">
                We gather every week for worship and the word.
              </p>

              {/* Detailed Schedule */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                    Sundays
                  </p>
                  <ul className="space-y-1 text-stone-700 text-sm font-medium">
                    <li className="flex justify-between">
                      <span>Bethel Service</span> <span>9:00 AM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>School of the Word</span> <span>10:30 AM</span>
                    </li>
                    <li className="flex justify-between font-bold text-stone-900">
                      <span>Victory House</span> <span>11:00 AM</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                    Tuesdays
                  </p>
                  <ul className="space-y-1 text-stone-700 text-sm font-medium">
                    <li className="flex justify-between">
                      <span>Bible Study (Zoom)</span> <span>6:30 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Location */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                Location
              </h3>
              <p className="text-stone-500 mb-4">
                We are located in the heart of Chicago.
              </p>
              <p className="font-bold text-stone-800 text-lg">
                4352 W Parker Ave
                <br />
                Chicago, IL 60639
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                className="inline-flex items-center gap-2 text-green-600 font-bold uppercase text-xs tracking-widest mt-4 hover:underline"
              >
                Get Directions <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT TO EXPECT --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">
              What to Expect
            </h2>
            <p className="text-stone-500">
              We know going to a new church can be intimidating. We want to
              remove the unknowns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Coffee size={32} />,
                title: "Come as you are",
                desc: "Suit and tie? Jeans and a tee? You'll see both here. We care about you, not your clothes.",
              },
              {
                icon: <Baby size={32} />,
                title: "Victory Kids",
                desc: "Safe, fun, and biblical. We have a dedicated check-in system for kids aged 6 months to 12 years.",
              },
              {
                icon: <Music size={32} />,
                title: "Passionate Worship",
                desc: "Our services last about 90 minutes. We sing, we pray, and we open the Bible together.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center px-4">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
