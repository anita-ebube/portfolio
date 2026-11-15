"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const STATUS_STAGES = [
  { at: 20, text: "INITIALIZING ENVIRONMENT..." },
  { at: 45, text: "LOADING TYPOGRAPHY & ASSETS..." },
  { at: 75, text: "CALIBRATING 3D HERO STAGE..." },
  { at: 95, text: "CONNECTING CAPABILITIES & PROJECTS..." },
  { at: 100, text: "SYSTEM READY" },
];

export function InitialPreloader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ENVIRONMENT...");
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If reduced motion is requested, finish quickly
    if (prefersReducedMotion) {
      setIsDone(true);
      return;
    }

    // Check if session already saw intro
    const hasSeen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("anita_intro_seen") === "true";
    const stepDuration = hasSeen ? 12 : 20;

    // Preload author portrait in background
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = "/images/potrait.jpeg";
    }

    let current = 0;
    const timer = setInterval(() => {
      // Natural progressive curve
      const inc = current < 35 ? 6 : current < 70 ? 4 : current < 92 ? 3 : 1;
      current = Math.min(100, current + inc);
      setProgress(current);

      const stage = STATUS_STAGES.find((s) => current <= s.at);
      if (stage) {
        setStatusText(stage.text);
      }

      if (current >= 100) {
        clearInterval(timer);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("anita_intro_seen", "true");
        }
        setTimeout(() => {
          setIsDone(true);
        }, 280);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="initial-preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0.98,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-canvas bg-architectural-grid p-6 sm:p-10 select-none overflow-hidden"
          aria-live="polite"
          aria-label="Loading Anita's portfolio experience"
        >
          {/* Ambient Electric Lime Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(200,255,0,0.12)_0%,transparent_70%)] blur-3xl"
          />

          {/* Top Telemetry */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
              <span>PORTFOLIO INITIALIZATION</span>
            </span>
            <span className="text-lime font-semibold">EDITION 2026</span>
          </div>

          {/* Center Stage: Monogram & Precision Counter */}
          <div className="relative z-10 mx-auto flex flex-col items-center text-center">
            {/* Monogram Badge */}
            <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(243,242,238,0.16)] bg-[rgba(13,15,18,0.92)] backdrop-blur-xl shadow-[0_0_32px_rgba(200,255,0,0.18)]">
              <span className="font-display text-2xl font-bold tracking-wider text-ink">
                A
              </span>
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_8px_#c8ff00]" />
            </div>

            {/* Name & Positioning */}
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
              ANITA UGOEBILLAH
            </h1>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.24em] text-lime font-semibold">
              PRODUCT MANAGER × FRONTEND DEVELOPER
            </p>

            {/* Precision Linear Track */}
            <div className="mt-8 w-60 sm:w-72">
              <div className="h-[2.5px] w-full rounded-full bg-[rgba(243,242,238,0.12)] overflow-hidden">
                <motion.div
                  className="h-full bg-lime shadow-[0_0_12px_#c8ff00]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
                <span className="text-ink-secondary">{statusText}</span>
                <span className="text-lime font-bold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ink-muted border-t border-[rgba(243,242,238,0.08)] pt-4">
            <span>UNN B.SC CS · PM × FE</span>
            <span>SECURE ASSET PIPELINE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
