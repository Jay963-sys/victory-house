"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";

const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/victoryalltheway",
    // CONSTANT COLOR (Removed 'hover:')
    color: "bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600",
    text: "Follow our Journey",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@RCCGVictoryHouseTV",
    // CONSTANT COLOR (Removed 'hover:')
    color: "bg-red-600",
    text: "Watch Services Live",
  },
  {
    name: "Email Us",
    icon: Mail,
    url: "mailto:info@victoryalltheway.org",
    // CONSTANT COLOR (Removed 'hover:')
    color: "bg-blue-600",
    text: "Get in Touch",
  },
  {
    name: "Call Us",
    icon: Phone,
    url: "tel:+13128332383",
    // CONSTANT COLOR (Removed 'hover:')
    color: "bg-green-600",
    text: "+1 (312) 833-2383",
  },
];

export default function SocialGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">
            Connect Online.
          </h2>
          <p className="text-stone-500 max-w-xl text-lg">
            Our community extends beyond Sunday morning. Follow us on social
            media for updates, encouragement, and a peek behind the scenes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              // Updated classes:
              // 1. Removed 'bg-stone-50' (we want brand color always)
              // 2. Added 'text-white' so text is readable on colored backgrounds
              className={`group relative p-8 rounded-3xl border-none overflow-hidden transition-all duration-300 ${social.color} text-white shadow-lg hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Content Container */}
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                {/* Icon Bubble - kept white for contrast */}
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-stone-900 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <social.icon size={26} strokeWidth={1.5} />
                </div>

                {/* Text - Always white now */}
                <div>
                  <h3 className="font-bold text-xl mb-1 text-white">
                    {social.name}
                  </h3>
                  <p className="text-sm text-white/80 font-medium">
                    {social.text}
                  </p>
                </div>
              </div>

              {/* Corner Arrow Icon - Always visible but slightly transparent */}
              <div className="absolute top-6 right-6 text-white/50 group-hover:text-white transition-colors">
                <ExternalLink size={20} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
