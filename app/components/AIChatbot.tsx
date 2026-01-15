"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  GripVertical,
  Sparkles,
} from "lucide-react";
// 1. IMPORT FRAMER MOTION
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isOpen && isMobile) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          assistantContent += text;

          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.role === "assistant") {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: assistantContent,
              };
              return updated;
            } else {
              return [
                ...prev,
                { role: "assistant", content: assistantContent },
              ];
            }
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 2. FIXED CONTAINER (Invisible to clicks)
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* 3. DRAGGABLE WRAPPER (Catches clicks) */}
      <motion.div
        drag
        dragMomentum={false}
        className="pointer-events-auto flex flex-col items-end"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-[380px] h-[520px] bg-stone-900/95 backdrop-blur-md text-white rounded-3xl shadow-2xl flex flex-col border border-stone-700 mb-4"
            >
              {/* Header */}
              <div
                className="p-4 flex justify-between items-center bg-green-600 rounded-t-3xl shadow-md cursor-grab active:cursor-grabbing"
                // Added cursor-grab to header to imply it can handle the drag
              >
                <span className="font-bold text-lg font-serif flex items-center gap-2">
                  <Sparkles size={18} />
                  Ask Vic
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-green-700 rounded-full p-1 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-900/80 scrollbar-thin scrollbar-thumb-stone-700"
              >
                {messages.length === 0 && !isLoading && (
                  <div className="bg-stone-700/70 p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                    <strong>Hi there! 👋 I'm Vic.</strong> <br />
                    Ask me about service times, prayer requests, or anything
                    Victory House related.
                  </div>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-white text-stone-900 ml-auto rounded-tr-none"
                        : "bg-green-700 text-white rounded-tl-none"
                    }`}
                  >
                    {m.content ||
                      (m.role === "assistant" && isLoading && "...")}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-stone-400 ml-2">
                    <Loader2 className="animate-spin" size={12} />
                    Vic is thinking…
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-stone-800 flex items-center gap-2 bg-stone-950 rounded-b-3xl"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-stone-800 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-stone-500"
                  placeholder="Type a message…"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button Container */}
        <div className="relative group">
          {/* Drag Handle Indicator (Visible when closed) */}
          {!isOpen && (
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <GripVertical size={20} />
            </div>
          )}

          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col items-center justify-center border-2 border-stone-800"
            >
              {/* Pulsing Ring */}
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>

              <MessageCircle size={28} className="mb-0.5" />
              <span className="text-[9px] font-bold tracking-wider">
                ASK VIC
              </span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
