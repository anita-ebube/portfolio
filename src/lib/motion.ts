"use client";

import { useSyncExternalStore } from "react";
import type { Transition, Variants } from "framer-motion";

/**
 * Shared editorial cubic-bezier curve used across Framer Motion interactions.
 */
export const EASE_EDITORIAL: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/**
 * Shared GSAP easing string matching the editorial motion language.
 */
export const GSAP_EASE = "power3.out";

/**
 * Spring configuration for tactile micro-interactions (nav pills, buttons).
 */
export const SPRING_TACTILE: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

export const navBarVariants: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_EDITORIAL,
    },
  },
};

export const mobileDrawerVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: EASE_EDITORIAL,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_EDITORIAL,
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

export const mobileDrawerItemVariants: Variants = {
  closed: { opacity: 0, y: 18 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: EASE_EDITORIAL,
    },
  },
};

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * SSR-safe hook to detect the user's `prefers-reduced-motion` OS preference.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}
