"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProgressBar from "@/components/ui/ProgressBar";
import OptionCard from "@/components/ui/OptionCard";
import ReactionBubble from "@/components/ui/ReactionBubble";
import { questions } from "@/data/questions";

/**
 * Chapter 3 — Vita Test™ questions. 10 questions, varied reactions,
 * playful progress dots.
 */
export default function QuizScreen({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);

  const total = questions.length;
  const q = questions[index];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    // deterministic-but-varied: rotate through reactions by question index
    const pool = i === q.safeIndex && i !== q.answer
      ? ["Main aman ya.", "Jawaban diplomatis."]
      : i === q.answer
        ? q.reactions.correct
        : q.reactions.wrong;
    setReaction(pool[index % pool.length]);
  };

  const next = useCallback(() => {
    if (index + 1 >= total) {
      onNext();
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setReaction(null);
  }, [index, total, onNext]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-16 sm:px-8">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <ProgressBar
          label={`Pertanyaan ${String(index + 1).padStart(2, "0")}`}
          current={index + 1}
          total={total}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex w-full flex-col items-center"
          >
            <h2 className="font-serif-display text-balance text-center text-2xl leading-snug text-charcoal sm:text-3xl">
              {q.question}
            </h2>

            <div className="mt-8 flex w-full flex-col gap-3">
              {q.options.map((opt, i) => (
                <OptionCard
                  key={i}
                  index={i}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                  state={
                    picked === null
                      ? undefined
                      : i === q.answer
                        ? "correct"
                        : i === picked
                          ? "wrong"
                          : "idle"
                  }
                >
                  {opt}
                </OptionCard>
              ))}
            </div>

            <AnimatePresence>
              {picked !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-col items-center gap-6"
                >
                  <ReactionBubble text={reaction ?? ""} />
                  <PrimaryButton onClick={next}>
                    {index + 1 >= total ? "Selesai" : "Lanjut"}
                  </PrimaryButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
