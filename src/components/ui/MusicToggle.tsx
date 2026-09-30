"use client";

import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useMusicContext } from "@/components/ui/MusicProvider";

/**
 * Small floating music toggle — playful pill, default OFF.
 */
export default function MusicToggle() {
  const { playing, toggle } = useMusicContext();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Matikan musik" : "Nyalakan musik"}
      aria-pressed={playing}
      whileTap={{ scale: 0.9 }}
      className={`fixed right-4 z-50 flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 shadow-sm backdrop-blur-sm transition-colors duration-300 ${
        playing
          ? "border-burgundy/40 bg-blush/90 text-burgundy"
          : "border-charcoal/10 bg-off-white/80 text-charcoal/60 hover:text-charcoal"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))", right: "max(1rem, env(safe-area-inset-right))" }}
    >
      {playing ? (
        <Music size={15} strokeWidth={2} aria-hidden />
      ) : (
        <VolumeX size={15} strokeWidth={2} aria-hidden />
      )}
      <span className="font-play text-[11px] font-medium tracking-[0.18em] uppercase">Music</span>
    </motion.button>
  );
}
