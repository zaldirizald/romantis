"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Confetti from "@/components/ui/Confetti";
import { story } from "@/data/story";

/**
 * Final Reveal — photo, message, one question, signature.
 * Subtle confetti, soft glow, slow fade.
 */
export default function FinalRevealScreen({ onRestart }: { onRestart: () => void }) {
  const f = story.finalReveal;
  const [stage, setStage] = useState(0); // 0 salutation → 1..3 lines → 4 question → 5 sig+replay
  const reduce = useReducedMotion();

  useEffect(() => {
    if (stage >= 5) return;
    const t = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 1600 : stage === 4 ? 2400 : 2000);
    return () => clearTimeout(t);
  }, [stage]);

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

      {stage >= 4 && <Confetti count={16} />}

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
            {f.lines.slice(0, stage - 1 + 1).map((l, i) => (
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

        {stage >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-balance mt-12 text-4xl leading-snug font-medium text-off-white sm:text-5xl"
          >
            {f.question}
          </motion.p>
        )}

        {stage >= 5 && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, rotate: -2 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center gap-9"
          >
            <div className="w-48 overflow-hidden rounded-2xl border-4 border-off-white/15 shadow-[0_22px_55px_-16px_rgba(0,0,0,0.6)] sm:w-56">
              <Image
                src={f.image}
                alt="Zaldi dan Vita"
                width={480}
                height={600}
                sizes="224px"
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="font-play text-sm tracking-[0.2em] text-off-white/70">
              {f.signature}
            </p>
            <PrimaryButton onClick={onRestart} variant="light">
              {f.replayButton}
            </PrimaryButton>
            <p className="font-play text-xs text-off-white/50 italic">{f.ps}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
