"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Chapter 6 — Suspicious Moment. Tone shifts: minimal background,
 * slower pacing. Not romantic yet — just honest.
 */
export default function SuspiciousScreen({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0);
  // 0 lines → 1 reason → 2 asked → 3 notYet → 4 almost → 5 next button

  useEffect(() => {
    if (stage !== 0) return;
    const t = setTimeout(() => setStage(1), 1600);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 2) return;
    const t = setTimeout(() => setStage(3), 1500);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 3) return;
    const t = setTimeout(() => setStage(4), 1400);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex max-w-md flex-col items-center gap-8">
        {story.suspicious.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`text-balance ${
              i === 0
                ? "font-serif-display text-4xl text-charcoal"
                : "text-lg text-charcoal-soft"
            }`}
          >
            {l}
          </motion.p>
        ))}

        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-balance max-w-sm text-lg leading-relaxed text-charcoal-soft">
              {story.suspicious.reason}
            </p>
            {stage === 1 && (
              <PrimaryButton onClick={() => setStage(2)}>
                {story.suspicious.reasonButton}
              </PrimaryButton>
            )}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {stage === 2 && (
            <motion.div
              key="asked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-serif-display text-5xl text-charcoal">
                {story.suspicious.notYet}
              </p>
            </motion.div>
          )}
          {stage >= 3 && stage < 5 && (
            <motion.div
              key="almost"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-serif-display text-3xl text-charcoal-soft italic">
                {story.suspicious.almost}
              </p>
              <PrimaryButton onClick={onNext}>{story.suspicious.button}</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
