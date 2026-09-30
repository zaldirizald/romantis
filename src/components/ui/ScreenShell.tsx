"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared game screen layout — full-screen centered, safe-area padding,
 * quick cinematic transition between screens (300–700ms).
 */
export default function ScreenShell({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex min-h-dvh w-full flex-col items-center justify-center px-5 py-14 sm:px-8 ${
        tone === "dark" ? "bg-charcoal text-off-white" : ""
      } ${className}`}
      style={{
        paddingTop: "max(3.5rem, env(safe-area-inset-top))",
        paddingBottom: "max(3.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {children}
    </motion.section>
  );
}
