"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Chapter 4 — Quick Choice. Fast this-or-that rounds, then a fake
 * analysis with a funny result.
 */
export default function QuickChoiceScreen({ onNext }: { onNext: () => void }) {
  const { rounds } = story.quickChoice;
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<"intro" | "playing" | "processing" | "result">("intro");
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("playing"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "processing") return;
    const lineTimer = setInterval(() => {
      setLine((l) => Math.min(l + 1, story.quickChoice.loadingLines.length - 1));
    }, 500);
    const doneTimer = setTimeout(() => setPhase("result"), 1800);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(doneTimer);
    };
  }, [phase]);

  const pick = () => {
    if (round + 1 >= rounds.length) {
      setLine(0);
      setPhase("processing");
    } else {
      setRound((r) => r + 1);
    }
  };

  const current = rounds[round];

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              {story.quickChoice.intro.map((l, i) => (
                <p key={i} className="font-serif-display text-3xl text-charcoal">
                  {l}
                </p>
              ))}
            </motion.div>
          )}

          {phase === "playing" && current && (
            <motion.div
              key={`round-${round}`}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-center"
            >
              <p className="text-balance text-base text-charcoal-soft">{current.prompt}</p>

              <div className="mt-10 flex w-full items-stretch justify-center gap-3">
                {([current.a, current.b] as const).map((opt, oi) => (
                  <motion.button
                    key={oi}
                    type="button"
                    onClick={pick}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ y: -3 }}
                    className="flex min-h-36 w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-charcoal/10 bg-white px-4 py-6 transition-colors hover:border-burgundy/50"
                    aria-label={opt.label}
                  >
                    <span className="text-4xl" aria-hidden>
                      {opt.emoji}
                    </span>
                    <span className="font-play text-base font-medium text-charcoal">
                      {opt.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <p className="mt-6 font-play text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                {round + 1} / {rounds.length}
              </p>
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="font-serif-display text-3xl text-charcoal">
                {story.quickChoice.wait}
              </p>
              <p className="font-play text-sm text-charcoal-soft">
                {story.quickChoice.processing}
              </p>
              <div className="flex h-6 items-center gap-1.5" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-pink-dusty"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-play text-xs text-ink-faint"
                >
                  {story.quickChoice.loadingLines[line]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <p className="font-play text-sm tracking-[0.2em] text-ink-faint uppercase">
                {story.quickChoice.resultTitle}
              </p>
              <p className="font-serif-display text-balance max-w-sm text-3xl leading-snug text-burgundy italic">
                {story.quickChoice.result}
              </p>
              <PrimaryButton onClick={onNext}>{story.quickChoice.button}</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
