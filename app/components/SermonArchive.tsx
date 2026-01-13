"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Play, Calendar, User, Filter } from "lucide-react";
import { useAudio } from "../context/AudioContext";
import Image from "next/image";

// Define the shape of a Sermon
interface Sermon {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  seriesTitle: string;
  imageUrl: string;
  fileUrl: string;
}

export default function SermonArchive({ sermons }: { sermons: Sermon[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { playTrack } = useAudio();

  // Filter Logic: Matches Title OR Preacher OR Series
  const filteredSermons = sermons.filter((sermon) => {
    const query = searchQuery.toLowerCase();
    return (
      sermon.title.toLowerCase().includes(query) ||
      sermon.preacher?.toLowerCase().includes(query) ||
      sermon.seriesTitle?.toLowerCase().includes(query)
    );
  });

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
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 group cursor-pointer"
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

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <Play
                        className="fill-stone-900 text-stone-900 ml-1"
                        size={24}
                      />
                    </div>
                  </div>

                  {/* Series Badge */}
                  {sermon.seriesTitle && (
                    <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {sermon.seriesTitle}
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />{" "}
                      {new Date(sermon.date).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span className="flex items-center gap-1 text-green-600">
                      <User size={12} /> {sermon.preacher}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-stone-900 leading-tight group-hover:text-green-600 transition-colors">
                    {sermon.title}
                  </h3>
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
    </section>
  );
}
