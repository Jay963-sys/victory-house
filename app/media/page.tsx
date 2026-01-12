import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import { Play, Mic } from "lucide-react";

const allMediaQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    date,
    preacher,
    "imageUrl": series->coverImage.asset->url,
    "fileUrl": audioFile.asset->url
  }
`;

export default async function MediaPage() {
  const sermons = await client.fetch(
    allMediaQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <main className="min-h-screen bg-stone-900 text-white">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
          Media Library
        </h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Catch up on what you missed. Sermons, worship moments, and podcasts.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon: any) => (
            <div
              key={sermon._id}
              className="group bg-stone-800 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-colors"
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
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-xl">
                    <Play className="fill-white ml-1" />
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
                <h3 className="text-xl font-bold font-serif mb-2 line-clamp-1">
                  {sermon.title}
                </h3>
                <p className="text-stone-400 text-sm mb-4">{sermon.preacher}</p>

                {/* We can wire this button to the global player later if you wish */}
                <button className="w-full py-3 rounded-lg bg-stone-900 text-stone-300 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors flex items-center justify-center gap-2">
                  <Mic size={14} /> Listen Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
