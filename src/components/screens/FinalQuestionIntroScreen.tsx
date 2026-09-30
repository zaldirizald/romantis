"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Chapter 7 — Final Question intro. Tension builder with a
 * cinematic transition on click.
 */
export default function FinalQuestionIntroScreen({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0); // 0 lines → 1 sub → 2 button

  useEffect(() => {
    if (stage !== 0) return;
    const t = setTimeout(() => setStage(1), 2400);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== 1) return;
    const t = setTimeout(() => setStage(2), 2400);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex max-w-md flex-col items-center gap-7">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-play text-[11px] font-bold tracking-[0.35em] text-burgundy uppercase"
        >
          {story.finalQuestion.label}
        </motion.p>

        {story.finalQuestion.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-4xl text-charcoal"
          >
            {l}
          </motion.p>
        ))}

        {stage >= 1 &&
          story.finalQuestion.sub.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`text-balance ${
                i === 0 ? "text-lg text-charcoal-soft" : "text-lg text-charcoal"
              }`}
            >
              {l}
            </motion.p>
          ))}

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <PrimaryButton onClick={onNext}>{story.finalQuestion.button}</PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
