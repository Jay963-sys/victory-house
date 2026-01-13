"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GivePage() {
  const [copiedZelle, setCopiedZelle] = useState(false);
  const [copiedCashApp, setCopiedCashApp] = useState(false);

  const ZELLE_EMAIL = "Quickpay@rccgvh.com";
  const CASHAPP_TAG = "$Victoryalltheway";

  const handleCopy = (text: string, type: "zelle" | "cashapp") => {
    navigator.clipboard.writeText(text);
    if (type === "zelle") {
      setCopiedZelle(true);
      setTimeout(() => setCopiedZelle(false), 2000);
    } else {
      setCopiedCashApp(true);
      setTimeout(() => setCopiedCashApp(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-32 px-6 bg-stone-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/30.jpg"
            fill
            className="object-cover"
            alt="Giving"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-stone-100 via-stone-900/80 to-stone-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            Ways to Give
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-200 max-w-2xl mx-auto mb-8"
          >
            Your generosity empowers us to serve our community and the world.
            Thank you for your partnership.
          </motion.p>
        </div>
      </section>

      {/* --- BIBLE VERSE CALLOUT --- */}
      <section className="max-w-4xl mx-auto px-6 relative z-20 -mt-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">📖</div>
            <div>
              <p className="text-lg md:text-xl italic text-stone-700 leading-relaxed mb-2">
                "Each of you should give what you have decided in your heart to
                give, not reluctantly or under compulsion, for God loves a
                cheerful giver."
              </p>
              <p className="text-sm font-bold text-stone-500">
                — 2 Corinthians 9:7
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- GIVING METHODS --- */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200"
        >
          <div className="bg-linear-to-r from-green-500 to-green-600 text-white text-center py-6 px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Choose Your Giving Method
            </h2>
            <p className="text-purple-100">
              Safe, secure, and simple ways to contribute
            </p>
          </div>

          {/* ZELLE */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 md:p-10 border-b border-stone-100 flex flex-col md:flex-row gap-6 md:items-center hover:bg-purple-50/30 transition-colors"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0 shadow-md">
              <Image src="/zelle.png" width={32} height={32} alt="Zelle" />
            </div>
            <div className="grow">
              <h3 className="text-2xl font-bold text-stone-900">Zelle</h3>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-60">
              <div className="flex items-center gap-2 bg-stone-50 border-2 border-stone-200 rounded-xl pl-4 pr-2 py-2 w-full justify-between hover:border-purple-300 transition-colors">
                <span className="font-mono font-bold text-stone-900 truncate select-all">
                  {ZELLE_EMAIL}
                </span>
                <button
                  onClick={() => handleCopy(ZELLE_EMAIL, "zelle")}
                  className="p-2 bg-white hover:bg-purple-50 rounded-lg border border-stone-200 transition-colors text-stone-500 hover:text-purple-600 shadow-sm"
                  title="Copy Email"
                >
                  {copiedZelle ? "✓" : "📋"}
                </button>
              </div>
              {copiedZelle && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold text-green-600"
                >
                  ✓ Copied to clipboard!
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* CASHAPP */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 md:p-10 border-b border-stone-100 flex flex-col md:flex-row gap-6 md:items-center bg-stone-50/30 hover:bg-green-50/50 transition-colors"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center shrink-0 shadow-md">
              <Image src="/cashapp.svg" width={32} height={32} alt="CashApp" />
            </div>
            <div className="grow">
              <h3 className="text-2xl font-bold text-stone-900">CashApp</h3>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-60">
              <div className="flex items-center gap-2 bg-white border-2 border-stone-200 rounded-xl pl-4 pr-2 py-2 w-full justify-between hover:border-green-300 transition-colors">
                <span className="font-mono font-bold text-stone-900 truncate select-all">
                  {CASHAPP_TAG}
                </span>
                <button
                  onClick={() => handleCopy(CASHAPP_TAG, "cashapp")}
                  className="p-2 bg-stone-50 hover:bg-green-50 rounded-lg border border-stone-200 transition-colors text-stone-500 hover:text-green-600 shadow-sm"
                  title="Copy Tag"
                >
                  {copiedCashApp ? "✓" : "📋"}
                </button>
              </div>
              {copiedCashApp && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold text-green-600"
                >
                  ✓ Copied to clipboard!
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* PAYPAL */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 md:p-10 border-b border-stone-100 flex flex-col md:flex-row gap-6 md:items-center hover:bg-blue-50/30 transition-colors"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 shadow-md">
              <Image src="/paypal.svg" width={32} height={32} alt="PayPal" />
            </div>
            <div className="grow">
              <h3 className="text-2xl font-bold text-stone-900">PayPal</h3>
            </div>
            <a
              href="https://paypal.me/victoryalltheway"
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-60 flex items-center justify-center gap-2 bg-[#0070BA] hover:bg-[#005ea6] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-xl hover:scale-105"
            >
              Give via PayPal.me →
            </a>
          </motion.div>

          {/* MAIL */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 md:p-10 bg-stone-100/50 flex flex-col md:flex-row gap-6 md:items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-stone-200 flex items-center justify-center shrink-0 shadow-md">
              <Image src="/mail.svg" width={32} height={32} alt="Mail" />
            </div>
            <div className="grow">
              <h3 className="text-2xl font-bold text-stone-900">
                Mail a Check
              </h3>
              <p className="text-stone-500 mt-1 font-medium">
                Payable to:{" "}
                <span className="font-bold text-stone-900">
                  Victory House Chicago
                </span>
              </p>
            </div>
            <div className="min-w-60 text-left md:text-right bg-white md:bg-transparent p-4 md:p-0 rounded-xl border-2 md:border-none border-stone-200 shadow-sm md:shadow-none">
              <p className="font-bold text-stone-900 text-lg">
                4352 W Parker Ave
              </p>
              <p className="text-stone-500">Chicago, IL 60639</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- FAQ / TRANSPARENCY --- */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-8 md:p-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2">
                Is my donation tax-deductible?
              </h4>
              <p className="text-stone-200">
                Yes! Victory House Chicago is a registered 501(c)(3) nonprofit.
                You'll receive a receipt for your records.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2">
                How is my donation used?
              </h4>
              <p className="text-stone-200">
                100% of donations support our ministry programs, community
                outreach, facility maintenance, and missions work.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2">
                Can I set up recurring giving?
              </h4>
              <p className="text-stone-200">
                Absolutely! You can schedule automatic payments through Zelle,
                CashApp, or PayPal for hassle-free regular giving.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
