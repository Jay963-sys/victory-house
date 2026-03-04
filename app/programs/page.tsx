import Image from "next/image";
import { Calendar, ArrowRight, Clock } from "lucide-react";
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

  // Use heroImage if available, otherwise fallback to the flyer for the background
  const bgImage = program.heroImage || program.flyer;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* 1. HEADER SECTION */}
      <section className="relative bg-stone-900 text-white py-32 px-6 text-center overflow-hidden">
        {/* Background Image & Overlay */}
        {bgImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={urlFor(bgImage).width(1920).url()}
              alt="Program Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            {/* Gradient overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
            {program.about}
          </p>

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

      {/* 2. FLYER & SCHEDULE SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: The Flyer */}
          {program.flyer && (
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={urlFor(program.flyer).width(1000).url()}
                alt={`${program.title} Flyer`}
                width={1000}
                height={1000}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Right: The Schedule */}
          {program.schedule && program.schedule.length > 0 && (
            <div className="flex flex-col h-full">
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8">
                Schedule
              </h2>

              <div className="space-y-4 mb-10">
                {program.schedule.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="sm:w-1/3 sm:border-r border-stone-100 sm:pr-4">
                      <h4 className="font-bold text-stone-900 flex items-center gap-2 mb-1">
                        <Calendar size={16} className="text-green-600" />{" "}
                        {item.day}
                      </h4>
                      <p className="text-stone-500 flex items-center gap-2 text-sm">
                        <Clock size={14} /> {item.time}
                      </p>
                    </div>
                    <div className="sm:w-2/3">
                      <p className="text-lg font-serif text-stone-800">
                        {item.activity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* UPDATED: EXTRA REGISTRATION BUTTON + COUNTDOWN SIDE BY SIDE */}
              <div className="mt-auto border-t border-stone-200 pt-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                <div>
                  <p className="text-stone-500 mb-4 font-medium">
                    Ready to join us?
                  </p>
                  {program.registrationLink && (
                    <a
                      href={program.registrationLink}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full transition-all shadow-lg w-full sm:w-auto"
                    >
                      Register for {program.title} <ArrowRight size={18} />
                    </a>
                  )}
                </div>

                {/* THE MINI COUNTDOWN */}
                {program.startDate && (
                  <SimpleCountdown targetDate={program.startDate} />
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. PAST PHOTOS GALLERY */}
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
