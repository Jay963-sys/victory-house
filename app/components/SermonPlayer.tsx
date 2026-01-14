"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Headphones, Video, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SermonPlayerProps {
  title: string;
  preacher: string;
  youtubeUrl: string; // Full URL: https://www.youtube.com/watch?v=...
  audioUrl?: string; // Optional: Link to MP3 file
  coverImage: string;
}

// Helper to get YouTube ID
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function SermonPlayer({
  title,
  preacher,
  youtubeUrl,
  audioUrl,
  coverImage,
}: SermonPlayerProps) {
  const [mode, setMode] = useState<"video" | "audio">("video");
  const videoId = getYouTubeId(youtubeUrl);

  return (
    <div className="w-full bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-800 relative group">
      {/* --- TOP CONTROLS --- */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
        <button
          onClick={() => setMode("video")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
            mode === "video"
              ? "bg-white text-black shadow-lg"
              : "text-stone-400 hover:text-white"
          }`}
        >
          <Video size={14} />
          Watch
        </button>
        {audioUrl && (
          <button
            onClick={() => setMode("audio")}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
              mode === "audio"
                ? "bg-green-600 text-white shadow-lg"
                : "text-stone-400 hover:text-white"
            }`}
          >
            <Headphones size={14} />
            Listen
          </button>
        )}
      </div>

      {/* --- MEDIA AREA --- */}
      <div className="relative aspect-video bg-stone-900 w-full">
        <AnimatePresence mode="wait">
          {/* VIDEO MODE */}
          {mode === "video" && videoId ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            /* AUDIO MODE */
            <motion.div
              key="audio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            >
              {/* Background Blur */}
              <div className="absolute inset-0 opacity-40">
                <Image
                  src={coverImage}
                  fill
                  alt={title}
                  className="object-cover blur-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-black/40" />

              {/* Audio Content */}
              <div className="relative z-10 w-full max-w-md">
                <div className="relative w-40 h-40 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                  <Image
                    src={coverImage}
                    fill
                    alt={title}
                    className="object-cover"
                  />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-stone-400 text-sm uppercase tracking-widest mb-8">
                  {preacher}
                </p>

                {/* HTML5 Audio Player Styled */}
                <audio
                  controls
                  className="w-full h-12 rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                  src={audioUrl}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
