"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Safe music controller — default OFF, no autoplay.
 * Supports a gentle fade-out and a duck (volume dip) so the
 * proposal moment can get quieter automatically.
 */
export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const fadeTo = useCallback((target: number, ms = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = audio.volume;
    const steps = 24;
    const stepMs = ms / steps;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * (i / steps)));
      if (i >= steps) {
        audio.volume = target;
        clearInterval(iv);
      }
    }, stepMs);
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0, 500);
      setTimeout(() => audio.pause(), 520);
      setPlaying(false);
      return;
    }
    try {
      audio.volume = 0;
      await audio.play();
      fadeTo(1, 800);
      setPlaying(true);
    } catch {
      // Autoplay policy or missing file — stay silent, no crash.
      setPlaying(false);
    }
  }, [playing, fadeTo]);

  return { playing, toggle, fadeTo };
}
