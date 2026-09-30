"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Reaction after MAU. Brief, sincere, not cheesy.
 */
export default function YesReactionScreen({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0); // 0 emoji → 1 lines → 2 button

  useEffect(() => {
    if (stage >= 2) return;
    const t = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 1500 : 2600);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center bg-burgundy-dark px-6 text-center text-off-white">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex max-w-md flex-col items-center gap-9">
        <motion.p
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 16 }}
          className="text-7xl"
          aria-label="tersenyum bahagia"
        >
          {story.yesReaction.emoji}
        </motion.p>

        {stage >= 1 &&
          story.yesReaction.lines.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 1.1, ease: [0.22, 1, 0.36, 1] }}
              className={`text-balance ${
                i === 0
                  ? "text-lg text-off-white/85 italic"
                  : "font-serif-display text-4xl"
              }`}
            >
              {l}
            </motion.p>
          ))}

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4"
          >
            <PrimaryButton onClick={onNext} variant="light">
              {story.yesReaction.button}
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
