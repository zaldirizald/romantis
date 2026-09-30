"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { story } from "@/data/story";

/**
 * Chapter 8 — Proposal. The big tone shift: elegant, slow, sincere.
 * The "NGGAK MAU" button dodges pointer/touch; teases escalate.
 */
export default function ProposalScreen({ onYes }: { onYes: () => void }) {
  const p = story.proposal;
  const [stage, setStage] = useState(0); // 0 name → 1 lead → 2 big q → 3 buttons
  const [dodges, setDodges] = useState(0);
  const [tease, setTease] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const arenaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const cooldown = useRef(false);

  useEffect(() => {
    if (stage >= 3) return;
    const t = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 2200 : stage === 1 ? 2000 : 2400);
    return () => clearTimeout(t);
  }, [stage]);

  /** Move the NO button to a random spot inside the arena, never over MAU. */
  const dodge = useCallback(() => {
    if (cooldown.current) return;
    cooldown.current = true;
    setTimeout(() => (cooldown.current = false), 250);

    const arena = arenaRef.current?.getBoundingClientRect();
    const btn = noRef.current?.getBoundingClientRect();
    if (!arena || !btn) return;

    // usable playfield: the arena minus a keep-out zone around the MAU button
    const pad = 12;
    const maxX = Math.max(0, (arena.width - btn.width) / 2 - pad);
    const maxY = Math.max(0, (arena.height - btn.height) / 2 - pad);

    let x = 0;
    let y = 0;
    // random direction, biased away from current spot; retry a few times
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      x = Math.cos(angle) * maxX * (0.55 + Math.random() * 0.45);
      y = Math.sin(angle) * maxY * (0.55 + Math.random() * 0.45);
      x = Math.max(-maxX, Math.min(maxX, x));
      y = Math.max(-maxY, Math.min(maxY, y));
      // keep distance from current position so it visibly "runs"
      if (Math.abs(x - offset.x) > 30 || Math.abs(y - offset.y) > 30) break;
    }
    setOffset({ x, y });

    const next = dodges + 1;
    setDodges(next);
    const teases = p.teases;
    setTease(teases[Math.min(next - 1, teases.length - 1)]);
  }, [dodges, offset.x, offset.y, p.teases]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-burgundy-dark px-6 py-16 text-center text-off-white">
      {/* subtle particles / glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 28%, rgba(217,165,165,0.16) 0%, transparent 70%)",
        }}
      />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {stage >= 0 && (
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-balance text-4xl font-medium sm:text-5xl"
          >
            {p.name}
          </motion.h1>
        )}

        {stage >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-off-white/80"
          >
            {p.lead}
          </motion.p>
        )}

        {stage >= 2 && (
          <div className="mt-12 flex flex-col items-center gap-6">
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-display text-5xl font-medium text-off-white sm:text-6xl"
            >
              {p.big[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-display text-balance text-5xl font-medium italic text-blush sm:text-6xl"
            >
              {p.big[1]}
            </motion.p>

            {/* photo — subtle, small, tilted like a keepsake */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 w-40 overflow-hidden rounded-xl border-4 border-off-white/20 shadow-[0_18px_45px_-14px_rgba(0,0,0,0.55)] sm:w-48"
            >
              <Image
                src={p.image}
                alt="Zaldi dan Vita"
                width={360}
                height={450}
                sizes="192px"
                className="h-auto w-full object-cover"
              />
            </motion.div>
          </div>
        )}

        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex w-full flex-col items-center"
          >
            {/* dodge arena — keeps the runaway button on screen */}
            <div ref={arenaRef} className="relative flex w-full flex-col items-center gap-5 py-6">
              <motion.button
                type="button"
                onClick={onYes}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 26 }}
                className="z-10 min-h-14 w-full max-w-xs rounded-full bg-off-white px-10 text-lg font-semibold tracking-wide text-burgundy-dark shadow-[0_18px_45px_-14px_rgba(0,0,0,0.5)]"
              >
                {p.yesButton}
              </motion.button>

              <motion.button
                ref={noRef}
                type="button"
                // dodge on any approach — mouse, touch, and keyboard focus
                onPointerEnter={dodge}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onFocus={dodge}
                onClick={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                animate={{ x: offset.x, y: offset.y }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="min-h-12 w-full max-w-xs rounded-full border-2 border-off-white/30 px-8 text-sm font-medium text-off-white/70"
                aria-label="Tombol nggak mau (yang suka kabur)"
              >
                {p.noButton}
              </motion.button>
            </div>

            {/* tease line */}
            <div className="mt-4 flex h-8 items-center" aria-live="polite">
              <AnimatePresence mode="wait">
                {tease && (
                  <motion.p
                    key={tease + dodges}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="font-play text-sm text-blush/90 italic"
                  >
                    {tease}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
