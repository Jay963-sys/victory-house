import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import MediaGrid from "../components/MediaGrid";

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
    { next: { revalidate: 3600 } }
  );

  return (
    <main className="min-h-screen bg-stone-900 text-white">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/4.jpg" // Using image 4 as requested
            alt="Media Library"
            fill
            className="object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Media Library
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Catch up on what you missed. Sermons, worship moments, and podcasts.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {/* Pass data to Client Component */}
        <MediaGrid sermons={sermons} />
      </section>
    </main>
  );
}
