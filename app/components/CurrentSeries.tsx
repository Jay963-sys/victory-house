"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Play, ArrowRight, Headphones, Video, X } from "lucide-react";
import { urlFor } from "@/sanity/lib/client";
import { useAudio } from "../context/AudioContext";
import Image from "next/image";

interface Sermon {
  title: string;
  date: string;
  slug: string;
  preacher?: string;
  fileUrl: string;
  youtubeUrl?: string;
}

interface SeriesData {
  title: string;
  subtitle: string;
  description: string;
  coverImage: any;
  recentSermons: Sermon[];
}

function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function CurrentSeries({ data }: { data: SeriesData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { playTrack, pause } = useAudio();

  // State for switching between Audio (Cover Art) and Video (YouTube)
  const [viewMode, setViewMode] = useState<"cover" | "video">("cover");
  const [activeVideoSermon, setActiveVideoSermon] = useState<Sermon | null>(
    data?.recentSermons?.[0] || null
  );

  if (!data) return null;

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (viewMode === "video") return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // --- HANDLERS ---
  const handleAudioPlay = (sermon: Sermon) => {
    if (!sermon.fileUrl) {
      alert("No audio file found for this sermon.");
      return;
    }
    setViewMode("cover");
    playTrack({
      title: sermon.title,
      preacher: sermon.preacher || "RCCG Victory House",
      src: sermon.fileUrl,
      image: urlFor(data.coverImage).width(200).url(),
    });
  };

  const handleVideoPlay = (sermon: Sermon) => {
    if (!sermon.youtubeUrl) {
      alert("No video available for this sermon.");
      return;
    }
    pause();
    setActiveVideoSermon(sermon);
    setViewMode("video");
  };

  // --- MAIN IMAGE CLICK HANDLER ---
  const handleMainPlay = () => {
    const latest = data.recentSermons?.[0];
    if (!latest) return;

    if (latest.youtubeUrl) {
      handleVideoPlay(latest);
    } else {
      handleAudioPlay(latest);
    }
  };

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="relative py-32 bg-stone-950 overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-green-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEFT COLUMN: MEDIA AREA --- */}
          <div
            className="w-full lg:w-1/2 perspective-1000 relative"
            style={{ perspective: 1000 }}
          >
            <AnimatePresence mode="wait">
              {viewMode === "cover" ? (
                // MODE A: 3D COVER ART
                <motion.div
                  key="cover"
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  onMouseMove={onMouseMove}
                  onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-xl bg-stone-800 shadow-2xl cursor-pointer group"
                  onClick={handleMainPlay}
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
                    Latest Message
                  </div>

                  {/* CONSTANT PLAY BUTTON OVERLAY */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-green-600 group-hover:border-green-500 transition-all duration-300">
                      {data.recentSermons?.[0]?.youtubeUrl ? (
                        <Video
                          className="fill-white text-white ml-1"
                          size={32}
                        />
                      ) : (
                        <Play
                          className="fill-white text-white ml-1"
                          size={32}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                // MODE B: YOUTUBE PLAYER
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-black"
                >
                  <button
                    onClick={() => setViewMode("cover")}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                  >
                    <X size={16} />
                  </button>

                  {activeVideoSermon?.youtubeUrl ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(
                        activeVideoSermon.youtubeUrl
                      )}?autoplay=1&rel=0`}
                      title="Sermon Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-500">
                      Video unavailable
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT COLUMN: INFO & CONTROLS --- */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-6 text-green-500">
                <span className="h-px w-12 bg-green-500/50"></span>
                <span className="font-mono text-sm tracking-widest uppercase">
                  {data.subtitle}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[0.9]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-500">
                  {data.title}
                </span>
              </h2>

              <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                {data.description}
              </p>

              {/* RECENT MESSAGES LIST (LAST 3) */}
              <div className="pt-8 border-t border-white/10 text-left">
                <p className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-6">
                  Recent Messages
                </p>

                <div className="space-y-3">
                  {data.recentSermons && data.recentSermons.length > 0 ? (
                    data.recentSermons.slice(0, 3).map((sermon, i) => (
                      <div
                        key={i}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10"
                      >
                        {/* Sermon Info */}
                        <div className="mb-4 sm:mb-0">
                          <h4 className="font-bold text-stone-200 group-hover:text-white transition-colors truncate max-w-[200px] md:max-w-[260px]">
                            {sermon.title}
                          </h4>
                          <p className="text-xs text-stone-500 mt-1">
                            {dateFormatter.format(new Date(sermon.date))}
                          </p>
                        </div>

                        {/* Distinct Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAudioPlay(sermon)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-green-600 text-stone-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                            title="Listen to Audio"
                          >
                            <Headphones size={14} />
                            <span>Listen</span>
                          </button>

                          {sermon.youtubeUrl && (
                            <button
                              onClick={() => handleVideoPlay(sermon)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-red-600 text-stone-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                              title="Watch Video"
                            >
                              <Video size={14} />
                              <span>Watch</span>
                            </button>
                          )}
                        </div>
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
