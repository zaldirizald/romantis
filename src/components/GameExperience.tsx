"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningScreen from "@/components/screens/OpeningScreen";
import GameIntroScreen from "@/components/screens/GameIntroScreen";
import QuizScreen from "@/components/screens/QuizScreen";
import QuickChoiceScreen from "@/components/screens/QuickChoiceScreen";
import JokeScreen from "@/components/screens/JokeScreen";
import SuspiciousScreen from "@/components/screens/SuspiciousScreen";
import FinalQuestionIntroScreen from "@/components/screens/FinalQuestionIntroScreen";
import ProposalScreen from "@/components/screens/ProposalScreen";
import YesReactionScreen from "@/components/screens/YesReactionScreen";
import FinalRevealScreen from "@/components/screens/FinalRevealScreen";
import MusicToggle from "@/components/ui/MusicToggle";
import { MusicProvider, useMusicContext } from "@/components/ui/MusicProvider";
import { story } from "@/data/story";

type ScreenId =
  | "loading"
  | "opening"
  | "gameIntro"
  | "quiz"
  | "quickChoice"
  | "joke"
  | "suspicious"
  | "finalQuestion"
  | "proposal"
  | "yesReaction"
  | "finalReveal";

const ORDER: ScreenId[] = [
  "opening",
  "gameIntro",
  "quiz",
  "quickChoice",
  "joke",
  "suspicious",
  "finalQuestion",
  "proposal",
  "yesReaction",
  "finalReveal",
];

export default function GameExperience() {
  return (
    <MusicProvider>
      <Game />
    </MusicProvider>
  );
}

function Game() {
  const [screen, setScreen] = useState<ScreenId>("loading");
  const [cycle, setCycle] = useState(0);
  const { fadeTo } = useMusicContext();

  useEffect(() => {
    if (screen !== "loading") return;
    const t = setTimeout(() => setScreen("opening"), 1500);
    return () => clearTimeout(t);
  }, [screen]);

  // gentle duck when the proposal begins, restore after the answer
  useEffect(() => {
    if (screen === "proposal") fadeTo(0.25, 1500);
    else if (screen === "yesReaction" || screen === "finalReveal") fadeTo(0.6, 2000);
  }, [screen, fadeTo]);

  const goNext = useCallback(() => {
    setScreen((s) => {
      const i = ORDER.indexOf(s);
      return i >= 0 && i < ORDER.length - 1 ? ORDER[i + 1] : s;
    });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const restart = useCallback(() => {
    setCycle((n) => n + 1);
    setScreen("opening");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main className="relative flex-1">
      <MusicToggle />

      <AnimatePresence mode="wait">
        {screen === "loading" && (
          <motion.section
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex min-h-dvh flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-play text-sm tracking-[0.2em] text-charcoal-soft">
              {story.loading.text}
            </p>
            <span className="mt-4 flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-pink-dusty"
                  animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </span>
          </motion.section>
        )}

        {screen === "opening" && <OpeningScreen key={`o-${cycle}`} onNext={goNext} />}
        {screen === "gameIntro" && <GameIntroScreen key={`g-${cycle}`} onNext={goNext} />}
        {screen === "quiz" && <QuizScreen key={`q-${cycle}`} onNext={goNext} />}
        {screen === "quickChoice" && <QuickChoiceScreen key={`k-${cycle}`} onNext={goNext} />}
        {screen === "joke" && <JokeScreen key={`j-${cycle}`} onNext={goNext} />}
        {screen === "suspicious" && <SuspiciousScreen key={`s-${cycle}`} onNext={goNext} />}
        {screen === "finalQuestion" && (
          <FinalQuestionIntroScreen key={`f-${cycle}`} onNext={goNext} />
        )}
        {screen === "proposal" && <ProposalScreen key={`p-${cycle}`} onYes={goNext} />}
        {screen === "yesReaction" && <YesReactionScreen key={`y-${cycle}`} onNext={goNext} />}
        {screen === "finalReveal" && (
          <FinalRevealScreen key={`r-${cycle}`} onRestart={restart} />
        )}
      </AnimatePresence>
    </main>
  );
}
