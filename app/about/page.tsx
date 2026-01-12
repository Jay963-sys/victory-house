"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-40">
          {/* Replace with a picture of your actual church congregation if available */}
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
            width={600}
            height={800}
            className="w-full h-full object-cover"
            alt="Congregation"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="text-orange-500 font-mono text-sm tracking-widest uppercase mb-4 block">
            Since 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8">
            Unorthodox <br />{" "}
            <span className="italic text-stone-400">Faith.</span>
          </h1>
        </div>
      </section>

      {/* --- MISSION STATEMENT --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <p className="text-2xl md:text-4xl font-serif leading-tight text-stone-800">
          "We exist to be a sanctuary for the broken and a training ground for
          the faithful. We believe church shouldn't be boring, and faith
          shouldn't be fake."
        </p>
        <div className="mt-12 w-24 h-1 bg-orange-500 mx-auto" />
      </section>

      {/* --- LEADERSHIP GRID --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900">
              Leadership
            </h2>
            <p className="text-stone-500">The servants leading the house.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Leader 1 */}
            <div className="group">
              <div className="aspect-[3/4] bg-stone-200 rounded-xl overflow-hidden mb-6 relative">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                  width={600}
                  height={800}
                  alt="Pastor"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Pastor Emmanuel
              </h3>
              <p className="text-orange-600 font-mono text-xs uppercase tracking-widest">
                Lead Pastor
              </p>
            </div>

            {/* Leader 2 */}
            <div className="group">
              <div className="aspect-[3/4] bg-stone-200 rounded-xl overflow-hidden mb-6 relative">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                  width={600}
                  height={800}
                  alt="Pastor"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Pastor Sarah</h3>
              <p className="text-orange-600 font-mono text-xs uppercase tracking-widest">
                Executive Pastor
              </p>
            </div>

            {/* Leader 3 */}
            <div className="group">
              <div className="aspect-[3/4] bg-stone-200 rounded-xl overflow-hidden mb-6 relative">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop"
                  width={600}
                  height={800}
                  alt="Pastor"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Min. Jay</h3>
              <p className="text-orange-600 font-mono text-xs uppercase tracking-widest">
                Media Director
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES / BELIEFS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-6">
              What We Believe.
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              Our doctrine is rooted in the Bible. We believe in the Trinity,
              the salvation of man through grace, and the active power of the
              Holy Spirit today.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "The Bible",
                desc: "The inspired, infallible word of God.",
              },
              {
                title: "Salvation",
                desc: "By grace alone, through faith alone, in Christ alone.",
              },
              {
                title: "Community",
                desc: "We are better together. Faith is not a solo sport.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-l-2 border-orange-200 pl-6 hover:border-orange-500 transition-colors"
              >
                <h4 className="font-bold text-xl text-stone-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
