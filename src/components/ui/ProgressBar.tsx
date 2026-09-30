"use client";

import { motion } from "framer-motion";

/**
 * Game progress indicator — "Level X" tag + dots.
 * Dots fill as the player advances.
 */
export default function ProgressBar({
  label,
  current,
  total,
}: {
  label: string;
  current: number; // 1-based
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3"
      aria-label={`Progres: ${label}, bagian ${current} dari ${total}`}
      role="status"
    >
      <span className="font-play text-[11px] font-medium tracking-[0.22em] text-ink-faint uppercase">
        {label}
      </span>
      <span className="flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <motion.span
            key={i}
            className="progress-dot"
            style={{ background: i < current ? "var(--rose)" : "var(--pink-soft)" }}
            animate={i === current - 1 ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </span>
    </motion.div>
  );
}
