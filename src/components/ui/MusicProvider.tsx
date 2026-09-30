"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useMusic } from "@/hooks/useMusic";

type MusicContextValue = {
  playing: boolean;
  toggle: () => void;
  fadeTo: (target: number, ms?: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

/** Wraps the app so any screen can duck the music for the proposal. */
export function MusicProvider({ children }: { children: ReactNode }) {
  const music = useMusic("/music/music.mp3");
  return <MusicContext.Provider value={music}>{children}</MusicContext.Provider>;
}

export function useMusicContext(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    // safe no-op fallback if used outside the provider
    const noop = () => undefined;
    return { playing: false, toggle: noop, fadeTo: noop };
  }
  return ctx;
}
