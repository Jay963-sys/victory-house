"use client";

import { useRef, useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, SkipBack, SkipForward, Download } from "lucide-react";
import Image from "next/image";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, closePlayer } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const handleDownload = () => {
    if (!currentTrack?.src) return;

    const downloadLink = `${currentTrack.src}?dl=${currentTrack.title}.mp3`;

    const link = document.createElement("a");
    link.href = downloadLink;
    link.setAttribute("download", `${currentTrack.title}.mp3`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentTrack.title,
          artist: currentTrack.preacher,
          album: "Victory Chapel Sermons",
          artwork: [
            {
              src: currentTrack.image || "/rccg.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: currentTrack.image || "/rccg.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: currentTrack.image || "/rccg.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        });

        // C. Hook up the Lock Screen Buttons
        navigator.mediaSession.setActionHandler("play", () => togglePlay());
        navigator.mediaSession.setActionHandler("pause", () => togglePlay());
        navigator.mediaSession.setActionHandler("previoustrack", () => {});
        navigator.mediaSession.setActionHandler("nexttrack", () => {});
      }
    }
  }, [isPlaying, currentTrack, togglePlay]);

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-[100]"
        >
          {/* Invisible Audio Element */}
          <audio
            ref={audioRef}
            src={currentTrack.src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => togglePlay()}
          />

          {/* Glass Container */}
          <div className="bg-stone-900/90 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 relative overflow-hidden">
            {/* Progress Bar Background */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
              <div
                className="h-full bg-orange-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Album Art */}
            {currentTrack.image && (
              <Image
                src={currentTrack.image}
                width={48}
                height={48}
                alt="Art"
                className="w-12 h-12 rounded-md object-cover"
              />
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-stone-400 truncate">
                {currentTrack.preacher}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button className="text-stone-400 hover:text-white transition-colors">
                <SkipBack size={20} />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white text-stone-900 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <button className="text-stone-400 hover:text-white transition-colors">
                <SkipForward size={20} />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closePlayer}
              className="ml-2 text-stone-500 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="text-stone-400 hover:text-orange-500 transition-colors"
              title="Download MP3"
            >
              <Download size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
