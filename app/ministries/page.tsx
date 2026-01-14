"use client";

import Ministries from "../components/Ministries";
import Image from "next/image";

export default function MinistriesPage() {
  return (
    <main className="bg-stone-50 min-h-screen">
      {/* Mini Hero for the Page */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-stone-900 pt-20">
        <div className="absolute inset-0 opacity-80">
          <Image
            src="/images/39.jpg"
            fill
            className="object-cover"
            alt="Worship"
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white">
            Serve & <span className="text-green-500">Connect.</span>
          </h1>
        </div>
      </section>

      {/* The Component we just built */}
      <Ministries />
    </main>
  );
}
