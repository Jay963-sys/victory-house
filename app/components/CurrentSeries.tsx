"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, ArrowRight, Headphones } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";
import { useAudio } from "../context/AudioContext";
import Image from "next/image";

// 1. Updated Interface with ALL required fields
interface SeriesData {
  title: string;
  subtitle: string;
  description: string;
  coverImage: any;
  recentSermons: {
    title: string;
    date: string;
    slug: string;
    preacher?: string; // Optional in case it's missing
    fileUrl: string; // Critical for audio
  }[];
}

export default function CurrentSeries({ data }: { data: SeriesData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { playTrack } = useAudio();

  // Safety Check
  if (!data) return null;

  // --- 3D MOUSE TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // --- HELPER TO PLAY AUDIO ---
  const handlePlay = (sermon: any) => {
    if (!sermon.fileUrl) {
      alert("No audio file found for this sermon.");
      return;
    }

    playTrack({
      title: sermon.title,
      preacher: sermon.preacher || "RCCG Victory Chapel",
      src: sermon.fileUrl,
      image: urlFor(data.coverImage).width(200).url(),
    });
  };

  return (
    <section className="relative py-32 bg-stone-950 overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* LEFT: 3D Series Art */}
          <div
            className="w-full lg:w-1/2 perspective-1000"
            style={{ perspective: 1000 }}
          >
            <motion.div
              ref={ref}
              onMouseMove={onMouseMove}
              onMouseLeave={() => {
                x.set(0);
                y.set(0);
              }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-xl bg-stone-800 shadow-2xl cursor-pointer group"
              // CLICK ART TO PLAY LATEST
              onClick={() =>
                data.recentSermons?.[0] && handlePlay(data.recentSermons[0])
              }
            >
              <div
                className="absolute inset-0 rounded-xl overflow-hidden border border-white/10"
                style={{ transform: "translateZ(20px)" }}
              >
                <Image
                  src={urlFor(data.coverImage).width(800).url()}
                  width={600}
                  height={800}
                  alt={data.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div
                className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-lg"
                style={{ transform: "translateZ(60px)" }}
              >
                Current Series
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <Play className="fill-white text-white ml-1" size={32} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Typography & Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-6 text-orange-500">
                <span className="h-[1px] w-12 bg-orange-500/50"></span>
                <span className="font-mono text-sm tracking-widest uppercase">
                  {data.subtitle}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[0.9]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-500">
                  {data.title}
                </span>
              </h2>

              <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                {data.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() =>
                    data.recentSermons?.[0] && handlePlay(data.recentSermons[0])
                  }
                  className="group relative px-8 py-4 bg-white text-stone-900 rounded-full font-bold overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Play size={18} className="fill-stone-900" /> Listen to
                    Latest
                  </span>
                  <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>

                <button className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Headphones size={18} /> Podcast Archive
                </button>
              </div>

              {/* Recent Messages Section */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-6">
                  Recent Messages
                </p>

                <div className="space-y-4">
                  {data.recentSermons && data.recentSermons.length > 0 ? (
                    data.recentSermons.map((sermon, i) => (
                      <div
                        key={i}
                        // CLICK TO PLAY INDIVIDUAL SERMON
                        onClick={() => handlePlay(sermon)}
                        className="group flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-500 group-hover:text-orange-500 transition-colors">
                            <Play size={12} className="fill-current" />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-200 group-hover:text-white transition-colors">
                              {sermon.title}
                            </h4>
                            <p className="text-xs text-stone-500">
                              {new Date(sermon.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-stone-600 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-600 italic text-sm">
                      No sermons uploaded for this series yet.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
