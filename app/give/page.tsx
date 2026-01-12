"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Mail,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

export default function GivePage() {
  const [copied, setCopied] = useState(false);
  const ZELLE_EMAIL = "give@victorychapelchicago.org"; // Replace with real Zelle email

  const handleCopy = () => {
    navigator.clipboard.writeText(ZELLE_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 bg-stone-900 text-white text-center relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/20 to-stone-900 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            Generosity is <br /> our{" "}
            <span className="text-orange-500 italic">Privilege.</span>
          </motion.h1>
          <p className="text-stone-400 text-lg md:text-xl leading-relaxed">
            Your giving supports the mission of Victory Chapel in Chicago and
            across the globe. Thank you for partnering with us to see lives
            transformed.
          </p>
        </div>
      </section>

      {/* --- GIVING OPTIONS GRID --- */}
      <section className="py-24 px-6 relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* OPTION 1: ONLINE (Primary) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center text-center group hover:border-orange-200 transition-colors"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CreditCard size={32} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Give Online
            </h3>
            <p className="text-stone-500 mb-8 text-sm">
              Simple, secure giving. Set up recurring gifts or make a one-time
              donation using your card or bank account.
            </p>
            <a
              href="#" // LINK TO TITHE.LY / STRIPE / PUSHPAY HERE
              className="mt-auto w-full py-4 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              Give Securely <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* OPTION 2: ZELLE (Very Popular in Chicago) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <Smartphone size={32} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">Zelle</h3>
            <p className="text-stone-500 mb-8 text-sm">
              Give directly from your banking app with zero fees. Use our email
              address below.
            </p>

            <div className="mt-auto w-full bg-stone-100 p-2 rounded-xl flex items-center justify-between pl-4 border border-stone-200">
              <span className="font-mono text-stone-600 text-sm truncate">
                {ZELLE_EMAIL}
              </span>
              <button
                onClick={handleCopy}
                className="bg-white p-2 rounded-lg shadow-sm border border-stone-100 hover:text-orange-600 transition-colors"
              >
                {copied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 font-bold mt-2">
                Copied to clipboard!
              </p>
            )}
          </motion.div>

          {/* OPTION 3: MAIL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Mail size={32} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Mail A Check
            </h3>
            <p className="text-stone-500 mb-8 text-sm">
              Prefer traditional giving? You can mail checks payable to "Victory
              Chapel" to our office.
            </p>

            <div className="mt-auto bg-stone-50 p-6 rounded-xl w-full border border-stone-200">
              <p className="font-serif text-stone-900 font-bold">
                Victory Chapel Chicago
              </p>
              <p className="text-stone-500 text-sm">PO Box 12345</p>
              <p className="text-stone-500 text-sm">Chicago, IL 60601</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FAQs --- */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-6">
            <h4 className="font-bold text-lg mb-2">Is online giving secure?</h4>
            <p className="text-stone-500">
              Yes. We use industry-standard encryption to protect your financial
              information. We do not store your credit card details on our
              servers.
            </p>
          </div>
          <div className="border-b border-stone-200 pb-6">
            <h4 className="font-bold text-lg mb-2">
              Can I set up recurring giving?
            </h4>
            <p className="text-stone-500">
              Absolutely. When you click "Give Securely," you can select
              "Weekly" or "Monthly" to automate your generosity.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
