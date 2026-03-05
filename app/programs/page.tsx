import Image from "next/image";
import { Calendar, ArrowRight, Clock, PlayCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/client";
import SimpleCountdown from "@/app/components/SimpleCountdown";

export const revalidate = 60;

const programQuery = `*[_type == "program" && isFeatured == true][0]`;

export default async function ProgramsPage() {
  const program = await client.fetch(programQuery);

  if (!program) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-stone-50">
        <h1 className="text-2xl text-stone-500 font-serif">
          More programs coming soon.
        </h1>
      </main>
    );
  }

  const bgImage = program.heroImage || program.flyer;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* 1. HEADER SECTION (Shortened Text) */}
      <section className="relative bg-stone-900 text-white py-32 md:py-40 px-6 text-center overflow-hidden">
        {bgImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(bgImage).width(1920).url()}
              alt="Program Background"
              fill
              className="object-cover opacity-60 md:opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-stone-950/50 md:bg-stone-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 md:via-stone-900/60 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-xl">
            {program.title}
          </h1>

          <p className="text-sm md:text-xl text-white md:text-stone-200 mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium leading-relaxed text-left md:text-center px-2 sm:px-4">
            {program.about}
          </p>

          {/* TOP BUTTON STAYS HERE AS REQUESTED */}
          {program.registrationLink && (
            <a
              href={program.registrationLink}
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-all shadow-xl hover:scale-105"
            >
              Register Now <ArrowRight size={18} />
            </a>
          )}
        </div>
      </section>

      {/* 2. THE NEW SECONDARY TEXT BOX */}
      {program.secondaryText && (
        <section className="pt-20 px-6 max-w-4xl mx-auto text-center -mb-8 relative z-20">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
            <p className="text-base md:text-lg text-stone-600 leading-relaxed font-medium">
              {program.secondaryText}
            </p>
          </div>
        </section>
      )}

      {/* 3. FLYERS & SCHEDULE SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Main Flyer + Teens Flyer + Massive Button */}
          <div className="flex flex-col gap-8">
            {program.flyer && (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src={urlFor(program.flyer).width(1000).url()}
                  alt={`${program.title} Main Flyer`}
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            )}

            {/* Saturday/Teens Flyer */}
            {program.teensFlyer && (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border-8 border-white">
                <Image
                  src={urlFor(program.teensFlyer).width(1000).url()}
                  alt="Teens Event Flyer"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            )}

            {/* Enlarged Bottom Button */}
            {program.registrationLink && (
              <div className="mt-4">
                <a
                  href={program.registrationLink}
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-6 bg-stone-900 hover:bg-green-600 text-white text-lg md:text-xl font-bold rounded-2xl transition-colors duration-300 shadow-xl"
                >
                  Register for {program.title} <ArrowRight size={24} />
                </a>
              </div>
            )}
          </div>

          {/* Right Column: The Schedule */}
          {program.schedule && program.schedule.length > 0 && (
            <div className="flex flex-col h-full sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-serif font-bold text-stone-900">
                  Schedule
                </h2>
                {/* Countdown moved up next to the Schedule title */}
                {program.startDate && (
                  <div className="scale-75 md:scale-90 origin-right">
                    <SimpleCountdown targetDate={program.startDate} />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {program.schedule.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-stone-100 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:border-green-200 transition-colors"
                  >
                    <div className="sm:w-1/3 sm:border-r border-stone-100 sm:pr-4">
                      <h4 className="font-bold text-stone-900 flex items-center gap-2 mb-0.5 text-sm md:text-base">
                        <Calendar
                          size={16}
                          className="text-green-600 shrink-0"
                        />{" "}
                        {item.day}
                      </h4>
                      <p className="text-stone-500 flex items-center gap-2 text-xs md:text-sm">
                        <Clock size={14} className="shrink-0" /> {item.time}
                      </p>
                    </div>
                    <div className="sm:w-2/3">
                      <p className="text-base md:text-lg font-serif text-stone-800">
                        {item.activity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. YOUTUBE PLAYLIST SECTION */}
      {program.youtubePlaylistUrl && (
        <section className="py-24 px-6 bg-stone-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4 flex items-center justify-center gap-3">
                <PlayCircle className="text-[#FF0000]" size={36} /> NIKOS
                Archive
              </h2>
              <p className="text-stone-600">
                Experience the power of past sessions.
              </p>
            </div>

            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black">
              <iframe
                src={program.youtubePlaylistUrl}
                title="YouTube Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {/* 5. PAST PHOTOS GALLERY */}
      {program.gallery && program.gallery.length > 0 && (
        <section className="py-24 px-6 bg-stone-950 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-4">Gallery</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {program.gallery.map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative aspect-square bg-stone-800 rounded-xl overflow-hidden group"
                >
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
