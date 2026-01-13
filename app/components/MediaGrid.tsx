"use client";

import { Play, Mic } from "lucide-react";
import Image from "next/image";
import { useAudio } from "../context/AudioContext";

export default function MediaGrid({ sermons }: { sermons: any[] }) {
  const { playTrack } = useAudio();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sermons.map((sermon) => (
        <div
          key={sermon._id}
          className="group bg-stone-800 rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-colors cursor-pointer"
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
          {/* Image Container */}
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={
                sermon.imageUrl ||
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
              }
              alt={sermon.title}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <Play className="fill-white ml-1 text-white" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-stone-900 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-400">
                Audio
              </span>
              <span className="text-xs text-stone-500">
                {new Date(sermon.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif mb-2 line-clamp-1 text-white group-hover:text-green-500 transition-colors">
              {sermon.title}
            </h3>
            <p className="text-stone-400 text-sm mb-4">{sermon.preacher}</p>

            <button className="w-full py-3 rounded-lg bg-stone-900 text-stone-300 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors flex items-center justify-center gap-2">
              <Mic size={14} /> Listen Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
