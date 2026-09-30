"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Chapter 2 — Vita Test™ intro. Playful, slightly cheeky.
 */
export default function GameIntroScreen({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0); // 0 lead → 1 title → 2 sub → 3 pause → 4 button

  useEffect(() => {
    if (stage >= 4) return;
    const t = setTimeout(
      () => setStage((s) => s + 1),
      stage === 0 ? 800 : stage === 1 ? 900 : stage === 2 ? 1800 : 900
    );
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex max-w-md flex-col items-center gap-6">
        {stage >= 0 && (
          <p className="font-play text-sm text-charcoal-soft">{story.gameIntro.lead}</p>
        )}
        {stage >= 1 && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="font-serif-display text-6xl font-semibold text-burgundy sm:text-7xl"
          >
            {story.gameIntro.title}
          </motion.h1>
        )}
        {stage >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-base text-charcoal-soft"
          >
            {story.gameIntro.sub}
          </motion.p>
        )}
        {stage >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-play text-sm text-burgundy italic"
          >
            {story.gameIntro.pause}
          </motion.p>
        )}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <PrimaryButton onClick={onNext}>{story.gameIntro.button}</PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
