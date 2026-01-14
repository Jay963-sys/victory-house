"use client";

import { useState, useEffect, MouseEvent, FormEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import {
  Users,
  Send,
  MessageCircle,
  X,
  ArrowRight,
  QrCode,
  Mail,
  Instagram,
  Youtube,
  Phone,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Image from "next/image";

// --- DATA ---
const connectOptions = [
  {
    id: "workers",
    title: "Join the Workforce",
    subtitle: "Serve in the House",
    description:
      "Don't just attend—belong. From the media team to the choir, there is a place for your gift.",
    image: "/images/49.jpg",
  },
  {
    id: "prayer",
    title: "Prayer Requests",
    subtitle: "We Stand With You",
    description:
      "Life happens. You don't have to carry it alone. Send us your prayer points, and our team will intercede.",
    image: "/images/50.jpg",
  },
  {
    id: "counseling",
    title: "Counseling",
    subtitle: "Let's Talk",
    description:
      "Marriage, relationships, or personal struggles. Get biblical guidance and support from our counseling team.",
    image: "/images/51.jpg",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/victoryalltheway",
    color: "bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600",
    text: "Follow our Journey",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@RCCGVictoryHouseTV",
    color: "bg-red-600",
    text: "Watch Services Live",
  },
  {
    name: "Email Us",
    icon: Mail,
    url: "mailto:info@victoryalltheway.org",
    color: "bg-blue-600",
    text: "Get in Touch",
  },
  {
    name: "Call Us",
    icon: Phone,
    url: "tel:+13128332383",
    color: "bg-green-600",
    text: "+1 (312) 833-2383",
  },
];

// --- COMPONENTS ---

function ConnectCard({
  item,
  onClick,
}: {
  item: (typeof connectOptions)[0];
  onClick: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[450px] w-full overflow-hidden rounded-[2.5rem] bg-stone-900 border border-stone-800 cursor-pointer shadow-xl"
      onMouseMove={handleMouseMove}
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full p-8 flex flex-col justify-end">
        <div></div>

        <h3 className="text-3xl font-serif font-bold text-white mb-2">
          {item.title}
        </h3>
        <p className="text-stone-300 mb-6 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group-hover:gap-4 transition-all">
          <span>Tap to Open</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}

const FormStatus = ({ type }: { type: "success" | "loading" }) => {
  if (type === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-stone-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-green-600" />
        <p className="text-sm font-bold uppercase tracking-widest">
          Sending...
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
        <CheckCircle2 size={32} />
      </div>
      <h4 className="text-2xl font-serif font-bold text-stone-900 mb-2">
        Received!
      </h4>
      <p className="text-stone-500 max-w-xs">
        We have received your submission. Someone from our team will be in touch
        shortly.
      </p>
    </div>
  );
};

const WorkersForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status !== "idle") return <FormStatus type={status} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
            First Name
          </label>
          <input
            required
            type="text"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="John"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
            Last Name
          </label>
          <input
            required
            type="text"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
          Phone Number
        </label>
        <input
          required
          type="tel"
          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="(312) 000-0000"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
          Area of Interest
        </label>
        <select className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Choir / Worship Team</option>
          <option>Media & Technical</option>
          <option>Ushers & Greeters</option>
          <option>Children's Church</option>
          <option>Prayer Team</option>
        </select>
      </div>

      <button className="w-full bg-green-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-green-700 transition-colors">
        Submit Application
      </button>
    </form>
  );
};

const PrayerForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status !== "idle") return <FormStatus type={status} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 text-sm mb-6">
        "For where two or three are gathered in my name, there am I among them."
        — Matthew 18:20
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
          Your Name (Optional)
        </label>
        <input
          type="text"
          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Anonymous"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
          Prayer Request
        </label>
        <textarea
          required
          rows={5}
          className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="How can we pray for you today?"
        />
      </div>

      <button className="w-full bg-stone-900 text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-orange-600 transition-colors">
        Send Prayer
      </button>
    </form>
  );
};

const CounselingContent = () => (
  <div className="mt-6 flex flex-col items-center text-center space-y-8">
    <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 w-full">
      <h4 className="text-xl font-bold text-purple-900 mb-2">Scan to Book</h4>
      <p className="text-purple-700 mb-6 text-sm">
        Use your camera to scan this QR code and schedule a session instantly.
      </p>

      {/* Placeholder for QR Code */}
      <div className="bg-white p-4 rounded-xl shadow-sm inline-block mx-auto">
        <QrCode size={120} className="text-stone-900" />
      </div>
    </div>

    <div className="w-full border-t border-stone-100 pt-8">
      <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
        Or Contact Directly
      </h4>
      <a
        href="mailto:info@victoryalltheway.org"
        className="flex items-center justify-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-stone-400 group-hover:text-purple-600">
          <Mail size={20} />
        </div>
        <span className="font-bold text-stone-700">
          info@victoryalltheway.org
        </span>
      </a>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function ConnectPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Scroll Lock Effect
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  const activeItem = connectOptions.find((item) => item.id === selectedId);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-50">
          {/* Use a connecting/people image here */}
          <Image
            src="/images/53.jpg"
            fill
            className="object-cover"
            alt="Connect with us"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

        <div className="relative z-10 text-center max-w-4xl px-6 pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-6"
          >
            The <span className="text-green-500">Hub.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you want to serve, need prayer, or are looking for counsel,
            you are in the right place.
          </motion.p>
        </div>
      </section>

      {/* --- 3-CARD LAYOUT --- */}
      <section className="px-6 pt-28 pb-32 bg-stone-100/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {connectOptions.map((item) => (
            <ConnectCard
              key={item.id}
              item={item}
              onClick={() => setSelectedId(item.id)}
            />
          ))}
        </div>
      </section>

      {/* --- SOCIAL LINKS --- */}
      <section className="px-6 relative z-20 mb-20">
        <div className="max-w-7xl mx-auto">
          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
              Stay Connected Beyond Sundays
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Worship doesn’t end when service is over. Follow, watch, or reach
              out — we’d love to stay connected with you throughout the week.
            </p>
          </motion.div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`
            group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg
            transition-transform hover:-translate-y-1 hover:shadow-xl
            ${link.color}
          `}
              >
                <div className="flex items-center justify-between mb-8">
                  <link.icon className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                    {link.name}
                  </p>
                  <p className="font-bold text-lg">{link.text}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && activeItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              layoutId={selectedId}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header Image */}
              <div className="relative h-40 bg-stone-900 shrink-0">
                <Image
                  src={activeItem.image}
                  fill
                  className="object-cover opacity-60"
                  alt={activeItem.title}
                />
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors z-20"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-8 z-10">
                  <h3 className="text-3xl font-serif font-bold text-white">
                    {activeItem.title}
                  </h3>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-widest">
                    {activeItem.subtitle}
                  </p>
                </div>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-8 overflow-y-auto">
                <p className="text-stone-500 mb-4">{activeItem.description}</p>

                {/* CONDITIONAL CONTENT RENDERING */}
                {selectedId === "workers" && <WorkersForm />}
                {selectedId === "prayer" && <PrayerForm />}
                {selectedId === "counseling" && <CounselingContent />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
