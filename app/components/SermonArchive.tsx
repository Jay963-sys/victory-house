"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Play,
  Calendar,
  User,
  Video,
  Headphones,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useAudio } from "../context/AudioContext";

// Define the shape of a Sermon
interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  seriesTitle: string;
  imageUrl: string;
  fileUrl: string;
  youtubeUrl?: string;
}

// Helper to extract YouTube ID
function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function SermonArchive({ sermons }: { sermons: Sermon[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { playTrack, pause } = useAudio();

  // State for the Video Modal
  const [selectedVideoSermon, setSelectedVideoSermon] = useState<Sermon | null>(
    null
  );

  // Filter Logic
  const filteredSermons = sermons.filter((sermon) => {
    const query = searchQuery.toLowerCase();
    return (
      sermon.title.toLowerCase().includes(query) ||
      sermon.preacher?.toLowerCase().includes(query) ||
      sermon.seriesTitle?.toLowerCase().includes(query)
    );
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideoSermon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedVideoSermon]);

  return (
    <section className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- SEARCH BAR SECTION --- */}
        <div className="mb-16 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">
              Sermon Archive
            </h1>
            <p className="text-stone-500">
              Browse {sermons.length} messages from our history.
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search title, preacher, or series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-full text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* --- THE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredSermons.map((sermon) => (
              <motion.div
                key={sermon._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="aspect-video relative overflow-hidden bg-stone-200">
                  {sermon.imageUrl ? (
                    <img
                      src={sermon.imageUrl}
                      alt={sermon.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <span className="font-serif italic text-2xl opacity-20">
                        Victory
                      </span>
                    </div>
                  )}

                  {/* Series Badge */}
                  {sermon.seriesTitle && (
                    <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {sermon.seriesTitle}
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />{" "}
                      {new Date(sermon.date).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span className="flex items-center gap-1 text-green-600 truncate">
                      <User size={12} /> {sermon.preacher}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-stone-900 leading-tight mb-6">
                    {sermon.title}
                  </h3>

                  {/* BUTTONS ROW (Always Visible) */}
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    {/* Listen Button */}
                    <button
                      onClick={() => {
                        if (sermon.fileUrl) {
                          playTrack({
                            title: sermon.title,
                            preacher: sermon.preacher || "Victory House",
                            src: sermon.fileUrl,
                            image: sermon.imageUrl,
                          });
                        } else {
                          alert("Audio coming soon!");
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-green-600 hover:text-white transition-colors"
                    >
                      <Headphones size={16} />
                      Listen
                    </button>

                    {/* Watch Button */}
                    {sermon.youtubeUrl ? (
                      <button
                        onClick={() => {
                          // 2. PAUSE AUDIO HERE
                          pause();
                          setSelectedVideoSermon(sermon);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-colors"
                      >
                        <Video size={16} />
                        Watch
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-50 text-stone-300 font-bold text-xs uppercase tracking-wider cursor-not-allowed"
                      >
                        <Video size={16} />
                        No Video
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSermons.length === 0 && (
          <div className="text-center py-24">
            <p className="text-stone-400 text-lg">
              No sermons found matching "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-green-600 font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {selectedVideoSermon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
            onClick={() => setSelectedVideoSermon(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-stone-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 bg-stone-900 border-b border-stone-800">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedVideoSermon.title}
                  </h3>
                  <p className="text-stone-400 text-sm">
                    {selectedVideoSermon.preacher}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVideoSermon(null)}
                  className="p-2 bg-stone-800 rounded-full text-stone-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* YouTube Player */}
              <div className="aspect-video w-full bg-black">
                {selectedVideoSermon.youtubeUrl ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(
                      selectedVideoSermon.youtubeUrl
                    )}?autoplay=1&modestbranding=1`}
                    title={selectedVideoSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-500">
                    Video Unavailable
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
