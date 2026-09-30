"use client";

import { motion } from "framer-motion";

/**
 * Playful reaction after an answer — soft pink speech bubble,
 * springy entrance.
 */
export default function ReactionBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="relative rounded-3xl rounded-bl-md bg-pink-soft px-6 py-4"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="font-play text-base font-medium text-muted-red"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
