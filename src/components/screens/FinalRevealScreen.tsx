"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Confetti from "@/components/ui/Confetti";
import { story } from "@/data/story";

/**
 * Final Reveal — closing letter: salutation, lines, signature, replay.
 * Subtle confetti, soft glow, slow fade.
 */
export default function FinalRevealScreen({ onRestart }: { onRestart: () => void }) {
  const f = story.finalReveal;
  const [stage, setStage] = useState(0); // 0 salutation → 1..lines → last sig+replay
  const reduce = useReducedMotion();
  const lastStage = f.lines.length + 2;

  useEffect(() => {
    if (stage >= lastStage) return;
    const t = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 1600 : 2000);
    return () => clearTimeout(t);
  }, [stage, lastStage]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-burgundy-dark px-6 py-16 text-center text-off-white">
      <div className="grain absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 25%, rgba(217,165,165,0.15) 0%, transparent 70%)",
        }}
      />

      {stage >= lastStage && <Confetti count={16} />}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display text-5xl font-medium"
        >
          {f.salutation}
        </motion.h1>

        {stage >= 1 && (
          <div className="mt-10 flex flex-col items-center gap-5">
            {f.lines.slice(0, stage).map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`text-balance leading-relaxed ${
                  i === f.lines.length - 1
                    ? "font-serif-display text-2xl italic text-blush"
                    : "max-w-sm text-base text-off-white/85"
                }`}
              >
                {l}
              </motion.p>
            ))}
          </div>
        )}

        {stage >= lastStage && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center gap-9"
          >
            <p className="font-play text-sm tracking-[0.2em] text-off-white/70">
              — {story.sender}
            </p>
            <PrimaryButton onClick={onRestart} variant="light">
              ulangi dari awal
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
