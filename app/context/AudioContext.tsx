"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: {
    title: string;
    preacher: string;
    src: string;
    image?: string;
  } | null;
  playTrack: (track: {
    title: string;
    preacher: string;
    src: string;
    image?: string;
  }) => void;
  togglePlay: () => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] =
    useState<AudioContextType["currentTrack"]>(null);

  // We will expose this function to any component (Hero, Series, etc)
  const playTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const closePlayer = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <AudioContext.Provider
      value={{ isPlaying, currentTrack, playTrack, togglePlay, closePlayer }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context)
    throw new Error("useAudio must be used within an AudioProvider");
  return context;
}
