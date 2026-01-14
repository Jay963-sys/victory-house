"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";

interface AudioContextType {
  currentTrack: {
    title: string;
    preacher: string;
    src: string;
    image: string;
  } | null;
  isPlaying: boolean;
  playTrack: (track: {
    title: string;
    preacher: string;
    src: string;
    image: string;
  }) => void;
  togglePlay: () => void;
  pause: () => void;
  closePlayer: () => void; // <--- ADD THIS
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<{
    title: string;
    preacher: string;
    src: string;
    image: string;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();

      // Auto-handle when song ends
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  const playTrack = (track: any) => {
    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // --- NEW FUNCTION: FULLY STOP AND CLOSE ---
  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop audio
      audioRef.current.currentTime = 0; // Reset time to 0
    }
    setIsPlaying(false);
    setCurrentTrack(null); // Clear track (hides player)
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        togglePlay,
        pause,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
