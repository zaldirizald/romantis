"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

type OptionCardProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  state?: "idle" | "picked" | "correct" | "wrong";
  index?: number;
  className?: string;
};

/**
 * Answer option — rounded card, letter badge, letter styling.
 * Shows check/cross after reveal.
 */
export default function OptionCard({
  children,
  onClick,
  disabled = false,
  state = "idle",
  index,
  className = "",
}: OptionCardProps) {
  const badge =
    state === "correct"
      ? "bg-muted-red text-off-white"
      : state === "picked" || state === "wrong"
        ? "bg-charcoal text-off-white"
        : "bg-pink-mist text-muted-red";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      aria-label={typeof children === "string" ? children : `Pilihan ${children}`}
      className={`option-card font-play text-base text-charcoal ${
        state === "correct"
          ? "!border-muted-red bg-pink-mist"
          : state === "wrong"
            ? "!border-charcoal/20 opacity-50"
            : state === "picked"
              ? "!border-charcoal bg-cream"
              : ""
      } ${disabled ? "cursor-default" : ""} ${className}`}
    >
      <span className="flex items-center gap-3.5">
        {index !== undefined && (
          <span
            aria-hidden
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-play text-xs font-bold uppercase transition-colors duration-300 ${badge}`}
          >
            {String.fromCharCode(65 + index)}
          </span>
        )}
        <span className="flex-1">{children}</span>
      </span>
      {state === "correct" && (
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="shrink-0 text-muted-red"
          aria-hidden
        >
          <Check size={20} strokeWidth={3} />
        </motion.span>
      )}
      {(state === "picked" || state === "wrong") && (
        <motion.span
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="shrink-0 text-charcoal/40"
          aria-hidden
        >
          <X size={20} strokeWidth={3} />
        </motion.span>
      )}
    </motion.button>
  );
}
