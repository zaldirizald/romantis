"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { story } from "@/data/story";

/**
 * Chapter 1 — Opening. Lines appear one by one, then the button.
 */
export default function OpeningScreen({ onNext }: { onNext: () => void }) {
  const [line, setLine] = useState(0);
  const lines = story.opening.lines;

  useEffect(() => {
    if (line >= lines.length) return;
    const t = setTimeout(() => setLine((l) => l + 1), line === 0 ? 900 : 1700);
    return () => clearTimeout(t);
  }, [line, lines.length]);

  const ready = line >= lines.length;

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative z-10 flex max-w-md flex-col items-center">
        <div className="flex flex-col items-center gap-7">
          {lines.slice(0, line).map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`text-balance leading-relaxed ${
                i === 0
                  ? "font-serif-display text-5xl text-charcoal sm:text-6xl"
                  : i === 1
                    ? "text-xl text-charcoal"
                    : "text-lg text-charcoal-soft"
              }`}
            >
              {l}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-center gap-5"
        >
          {ready && (
            <>
              <PrimaryButton onClick={onNext}>{story.opening.button}</PrimaryButton>
              <p className="font-play text-xs text-ink-faint italic">{story.opening.hint}</p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
