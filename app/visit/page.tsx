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

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-60">
          {/* Replace with a photo of people greeting each other */}
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Welcome to Church"
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
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                Service Times
              </h3>
              <p className="text-stone-500 mb-4">
                We gather every week for worship and the word.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 font-bold text-stone-800">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />{" "}
                  Sundays @ 10:00 AM
                </li>
                <li className="flex items-center gap-3 font-bold text-stone-800">
                  <span className="w-2 h-2 bg-stone-300 rounded-full" />{" "}
                  Wednesdays @ 6:30 PM (Youth)
                </li>
              </ul>
            </div>
          </div>

          {/* Box 2: Location */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
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
                className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase text-xs tracking-widest mt-4 hover:underline"
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

      {/* --- PLAN YOUR VISIT FORM --- */}
      <section className="py-24 bg-orange-600 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Let us know you're coming!
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Fill out this quick form and we will:
            </p>
            <ul className="space-y-4">
              {[
                "Meet you at the front door",
                "Help you get your kids checked in",
                "Save a seat for you",
                "Give you a free gift",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold">
                  <CheckCircle className="text-orange-200" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-96 bg-white rounded-2xl p-6 text-stone-900 shadow-2xl">
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-stone-100 rounded-lg px-4 py-3 border-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-stone-100 rounded-lg px-4 py-3 border-none focus:ring-2 focus:ring-orange-500"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-1">
                  Planning to visit on?
                </label>
                <input
                  type="date"
                  className="w-full bg-stone-100 rounded-lg px-4 py-3 border-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors">
                Plan My Visit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
