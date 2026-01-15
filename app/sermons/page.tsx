import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import SermonArchive from "../components/SermonArchive";
import Image from "next/image";

// The Query
const allSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    preacher,
    date,
    "seriesTitle": series->title,
    "imageUrl": series->coverImage.asset->url,
    "fileUrl": audioFile.asset->url,
    youtubeUrl // <--- ADDED THIS FIELD
  }
`;

export const revalidate = 60;

export default async function SermonsPage() {
  const sermons = await client.fetch(allSermonsQuery);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header / Hero for Archive */}
      <div className="relative bg-stone-900 pt-40 pb-20 px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/images/27.jpg" // Ensure this image exists in your public folder
            alt="The Word"
            fill
            className="object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            The Word.
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Dive into our library of teachings. Listen, learn, and grow at your
            own pace.
          </p>
        </div>
      </div>

      {/* The Searchable Grid */}
      <SermonArchive sermons={sermons} />
    </main>
  );
}
