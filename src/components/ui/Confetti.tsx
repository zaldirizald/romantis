"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Small playful confetti burst — few pieces, muted palette.
 * Fires once on mount. Disabled with reduced motion.
 */
export default function Confetti({ count = 20 }: { count?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const pieces = Array.from({ length: count }, (_, i) => ({
    x: ((i * 41) % 100) - 50,
    delay: ((i * 13) % 10) / 40,
    duration: 1.1 + ((i * 7) % 8) / 10,
    size: 5 + (i % 3) * 3,
    color: ["#d9a5a5", "#f6dcdc", "#a64b5b", "#f7f1e9"][i % 4],
    round: i % 2 === 0,
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.round ? 9999 : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: `${p.x * 4}px`,
            y: [0, -80 - (i % 5) * 18, 200],
            opacity: [1, 1, 0],
            rotate: (i * 53) % 360,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
