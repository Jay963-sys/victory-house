import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import SermonArchive from "../components/SermonArchive";

// The Query
const allSermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    preacher,
    date,
    // Fetch the linked series title
    "seriesTitle": series->title,
    // Fetch the linked series image (referencing the coverImage inside the series)
    "imageUrl": series->coverImage.asset->url,
    // Fetch the audio
    "fileUrl": audioFile.asset->url
  }
`;

export const revalidate = 60; // Check for new sermons every 60 seconds

export default async function SermonsPage() {
  const sermons = await client.fetch(allSermonsQuery);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header / Hero for Archive */}
      <div className="bg-stone-900 pt-40 pb-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
          The Word.
        </h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Dive into our library of teachings. Listen, learn, and grow at your
          own pace.
        </p>
      </div>

      {/* The Searchable Grid */}
      <SermonArchive sermons={sermons} />
    </main>
  );
}
