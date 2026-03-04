"use client";

import { useState, useEffect } from "react";

export default function SimpleCountdown({
  targetDate,
}: {
  targetDate: string;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    setIsReady(true);
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render until client-side matches to avoid hydration errors, or if event passed
  if (!isReady || +new Date(targetDate) - +new Date() <= 0) return null;

  return (
    <div className="flex gap-2 sm:gap-4">
      <Unit value={timeLeft.days} label="Days" />
      <span className="text-stone-300 font-bold self-start mt-2">:</span>
      <Unit value={timeLeft.hours} label="Hrs" />
      <span className="text-stone-300 font-bold self-start mt-2">:</span>
      <Unit value={timeLeft.minutes} label="Min" />
      <span className="text-stone-300 font-bold self-start mt-2">:</span>
      <Unit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-stone-100 text-stone-900 border border-stone-200 font-mono font-bold text-xl sm:text-2xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl shadow-inner">
        {value < 10 ? `0${value}` : value}
      </div>
      <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mt-2">
        {label}
      </span>
    </div>
  );
}
