"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export interface SectionInfo {
  index: number;
  num: string;
  label: string;
  id: string;
  kicker: string;
}

export const PORTFOLIO_SECTIONS: SectionInfo[] = [
  { index: 0, num: "01", label: "Home", id: "home", kicker: "STAGE" },
  { index: 1, num: "02", label: "About", id: "about", kicker: "PERSPECTIVE" },
  { index: 2, num: "03", label: "Experience", id: "experience", kicker: "LEADERSHIP" },
  { index: 3, num: "04", label: "Work With", id: "work-with", kicker: "WHAT I WORK WITH" },
  { index: 4, num: "05", label: "Projects", id: "projects", kicker: "PRODUCT WORK" },
  { index: 5, num: "06", label: "Contact", id: "contact", kicker: "DIALOGUE" },
];

export const TOTAL_SECTIONS = PORTFOLIO_SECTIONS.length;

interface SectionTransitionContextType {
  activeSection: number;
  direction: "down" | "up" | null;
  isTransitioning: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  goToSection: (index: number) => void;
  nextSection: () => void;
  prevSection: () => void;
}

const defaultTransitionValue: SectionTransitionContextType = {
  activeSection: 0,
  direction: null,
  isTransitioning: false,
  isModalOpen: false,
  setIsModalOpen: () => {},
  goToSection: () => {},
  nextSection: () => {},
  prevSection: () => {},
};

const SectionTransitionContext = createContext<SectionTransitionContextType>(defaultTransitionValue);

export function useSectionTransition() {
  return useContext(SectionTransitionContext);
}

export function SectionTransitionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [direction, setDirection] = useState<"down" | "up" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeSectionRef = useRef<number>(0);
  activeSectionRef.current = activeSection;

  const isTransitioningRef = useRef<boolean>(false);
  isTransitioningRef.current = isTransitioning;

  const isModalOpenRef = useRef<boolean>(false);
  isModalOpenRef.current = isModalOpen;

  const lastTransitionTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionDuration = prefersReducedMotion ? 250 : 750;

  const goToSection = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_SECTIONS - 1, targetIndex));
      if (clamped === activeSectionRef.current) return;

      const newDirection = clamped > activeSectionRef.current ? "down" : "up";
      setDirection(newDirection);
      setIsTransitioning(true);
      activeSectionRef.current = clamped;
      setActiveSection(clamped);
      lastTransitionTimeRef.current = Date.now();

      // Sync URL hash
      if (typeof window !== "undefined") {
        const hash = PORTFOLIO_SECTIONS[clamped]?.id;
        if (hash) {
          window.history.replaceState(null, "", `#${hash}`);
        }
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    },
    [transitionDuration]
  );

  const nextSection = useCallback(() => {
    if (activeSectionRef.current < TOTAL_SECTIONS - 1) {
      goToSection(activeSectionRef.current + 1);
    }
  }, [goToSection]);

  const prevSection = useCallback(() => {
    if (activeSectionRef.current > 0) {
      goToSection(activeSectionRef.current - 1);
    }
  }, [goToSection]);

  // Initial load hash detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initialHash = window.location.hash.replace("#", "").toLowerCase();
    if (!initialHash) return;

    const matched = PORTFOLIO_SECTIONS.findIndex((s) => s.id === initialHash);
    if (matched >= 0) {
      setActiveSection(matched);
      activeSectionRef.current = matched;
    }
  }, []);

  // Wheel, Touch, and Keyboard Listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onWheel = (e: WheelEvent) => {
      // Never hijack if a modal is open
      if (isModalOpenRef.current) return;

      // Allow natural scrolling inside elements with data-allow-scroll
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.dataset?.allowScroll === "true") {
          const isScrollable = target.scrollHeight > target.clientHeight;
          if (isScrollable) return;
        }
        target = target.parentElement;
      }

      // Check transition cooldown
      const now = Date.now();
      if (now - lastTransitionTimeRef.current < transitionDuration) {
        return;
      }

      // Require decisive wheel movement
      const threshold = 32;
      if (Math.abs(e.deltaY) < threshold) return;

      if (e.deltaY > 0) {
        if (activeSectionRef.current < TOTAL_SECTIONS - 1) {
          e.preventDefault();
          nextSection();
        }
      } else {
        if (activeSectionRef.current > 0) {
          e.preventDefault();
          prevSection();
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isModalOpenRef.current) return;
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isModalOpenRef.current) return;
      if (touchStartYRef.current === null || touchStartXRef.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - touchEndY;
      const diffX = touchStartXRef.current - touchEndX;

      touchStartYRef.current = null;
      touchStartXRef.current = null;

      // Only trigger if vertical swipe dominates horizontal swipe
      if (Math.abs(diffY) < Math.abs(diffX) * 1.2) return;

      const swipeThreshold = 45;
      if (Math.abs(diffY) < swipeThreshold) return;

      const now = Date.now();
      if (now - lastTransitionTimeRef.current < transitionDuration) return;

      if (diffY > 0) {
        // Swiped up -> next section
        if (activeSectionRef.current < TOTAL_SECTIONS - 1) {
          nextSection();
        }
      } else {
        // Swiped down -> previous section
        if (activeSectionRef.current > 0) {
          prevSection();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isModalOpenRef.current) return;

      // Do not hijack typing in inputs
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "SELECT")
      ) {
        return;
      }

      const now = Date.now();
      if (now - lastTransitionTimeRef.current < transitionDuration) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeSectionRef.current < TOTAL_SECTIONS - 1) {
          e.preventDefault();
          nextSection();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeSectionRef.current > 0) {
          e.preventDefault();
          prevSection();
        }
      } else if (e.key === " " && !e.shiftKey) {
        if (activeSectionRef.current < TOTAL_SECTIONS - 1) {
          e.preventDefault();
          nextSection();
        }
      } else if (e.key === " " && e.shiftKey) {
        if (activeSectionRef.current > 0) {
          e.preventDefault();
          prevSection();
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSection(TOTAL_SECTIONS - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // Provide testing/automation hook
    (window as unknown as { __goToSection?: (i: number) => void; __getActiveSection?: () => number }).__goToSection = goToSection;
    (window as unknown as { __goToSection?: (i: number) => void; __getActiveSection?: () => number }).__getActiveSection = () => activeSectionRef.current;

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goToSection, nextSection, prevSection, transitionDuration]);

  return (
    <SectionTransitionContext.Provider
      value={{
        activeSection,
        direction,
        isTransitioning,
        isModalOpen,
        setIsModalOpen,
        goToSection,
        nextSection,
        prevSection,
      }}
    >
      {children}
    </SectionTransitionContext.Provider>
  );
}
