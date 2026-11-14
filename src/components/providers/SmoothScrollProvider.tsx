"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/motion";

// Protect development overlay & console from third-party browser extension noise (e.g. MetaMask inpage.js)
if (typeof window !== "undefined") {
  window.addEventListener(
    "unhandledrejection",
    (event) => {
      const reason = event.reason;
      const stack =
        typeof reason === "object" && reason !== null && "stack" in reason
          ? String((reason as { stack?: unknown }).stack)
          : "";
      const message =
        typeof reason === "object" && reason !== null && "message" in reason
          ? String((reason as { message?: unknown }).message)
          : String(reason);

      if (
        stack.includes("chrome-extension://") ||
        stack.includes("moz-extension://") ||
        message.includes("MetaMask") ||
        message.includes("inpage.js") ||
        message.includes("Failed to connect to MetaMask")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true,
  );

  // Suppress Three.js r187 Clock deprecation warning until upstream React Three Fiber migrates to THREE.Timer
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // On the single-page full-screen presentation or with reduced motion,
    // avoid running an unnecessary continuous Lenis RAF loop on window.
    if (prefersReducedMotion || pathname === "/") {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion, pathname]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement) => {
      if (lenisRef.current && !prefersReducedMotion) {
        lenisRef.current.scrollTo(target, {
          offset: -76,
          duration: 1.1,
        });
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "auto" });
      } else {
        target.scrollIntoView({ behavior: "auto" });
      }
    },
    [prefersReducedMotion],
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
