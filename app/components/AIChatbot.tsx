"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

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

  // Lock body scroll when chat is open on mobile only
  useEffect(() => {
    // Only lock scroll on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;

    if (isOpen && isMobile) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // Cleanup on unmount
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
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Response received, starting to read stream..."); // DEBUG

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream complete. Total content:", assistantContent); // DEBUG
            break;
          }

          const text = decoder.decode(value, { stream: true });
          console.log("Raw chunk:", text); // DEBUG

          // The stream is coming as plain text, not formatted
          // Just append it directly
          assistantContent += text;
          console.log("Updated content:", assistantContent); // DEBUG

          // Update or add the assistant message
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.role === "assistant") {
              // Update existing assistant message
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: assistantContent,
              };
              return updated;
            } else {
              // Add new assistant message
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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[520px] bg-stone-900/95 backdrop-blur-md text-white rounded-3xl shadow-2xl flex flex-col border border-stone-700">
          {/* Header */}
          <div className="p-4 flex justify-between items-center bg-green-600 rounded-t-3xl shadow-md">
            <span className="font-bold text-lg font-serif flex items-center gap-2">
              <Loader2 className="animate-pulse" size={18} />
              Ask Vic
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-900/80"
          >
            {messages.length === 0 && !isLoading && (
              <div className="bg-stone-700/70 p-3 rounded-2xl text-sm">
                Hi there! 👋 I'm Vic. Ask me about service times, prayer
                requests, or anything Victory House related.
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-3xl text-sm shadow ${
                  m.role === "user"
                    ? "bg-white text-black ml-auto rounded-tr-none"
                    : "bg-green-700 text-white rounded-tl-none"
                }`}
              >
                {m.content || (m.role === "assistant" && isLoading && "...")}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <Loader2 className="animate-spin" size={14} />
                Vic is thinking…
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-stone-700 flex items-center gap-2 bg-stone-950 rounded-b-3xl"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-stone-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <div className="relative">
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75"></div>

          {/* Main button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform group"
          >
            <MessageCircle size={28} className="mb-0.5" />
            <span className="text-[9px] font-bold tracking-wider">ASK VIC</span>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 right-0 bg-stone-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chat with Vic - Your Victory House Assistant
              <div className="absolute top-full right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-900"></div>
            </div>
          </button>
        </div>
      )}

      {/* Close button when chat is open */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="w-14 h-14 rounded-full bg-green-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={24} />
        </button>
      )}
    </div>
  );
}
