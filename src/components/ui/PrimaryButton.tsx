"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "dark" | "light";
  className?: string;
  ariaLabel?: string;
};

/**
 * Main CTA button — charcoal pill, satisfying tap scale.
 * Min 48px touch target.
 */
export default function PrimaryButton({
  children,
  onClick,
  variant = "dark",
  className = "",
  ariaLabel,
}: PrimaryButtonProps) {
  const isDark = variant === "dark";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 26 }}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-9 text-sm font-semibold tracking-wide transition-colors duration-200 ${
        isDark
          ? "bg-charcoal text-off-white hover:bg-muted-red"
          : "bg-off-white text-charcoal hover:bg-pink-soft"
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}
