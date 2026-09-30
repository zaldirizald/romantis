"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Chapter 5 — Random jahil moment. "Tes penting" → punchline.
 */
export default function JokeScreen({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0); // 0 lead → 1 button → 2 punchline → 3 button2

  useEffect(() => {
    if (stage !== 2) return;
    const t = setTimeout(() => setStage(3), 900);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex max-w-md flex-col items-center gap-9">
        <AnimatePresence mode="wait">
          {stage === 0 || stage === 1 ? (
            <motion.div
              key="lead"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-9"
            >
              <p className="font-serif-display text-4xl text-charcoal">{story.joke.lead}</p>
              <PrimaryButton onClick={() => setStage(2)}>{story.joke.button}</PrimaryButton>
            </motion.div>
          ) : (
            <motion.div
              key="punch"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-9"
            >
              <p className="text-xl text-charcoal-soft">{story.joke.punch[0]}</p>
              <p className="font-serif-display text-5xl text-burgundy">{story.joke.punch[1]}</p>
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <PrimaryButton onClick={onNext}>{story.joke.button2}</PrimaryButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
