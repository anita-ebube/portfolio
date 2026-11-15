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

  const prefersReducedMotion = usePrefersReducedMotion();

  // Smooth scroll to target section without hijacking natural wheel/touch events
  const goToSection = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_SECTIONS - 1, targetIndex));
      const sectionInfo = PORTFOLIO_SECTIONS[clamped];
      if (!sectionInfo) return;

      const newDirection = clamped > activeSectionRef.current ? "down" : "up";
      setDirection(newDirection);
      setIsTransitioning(true);
      activeSectionRef.current = clamped;
      setActiveSection(clamped);

      if (typeof window !== "undefined") {
        const el = document.getElementById(sectionInfo.id);
        if (el) {
          const navHeight = 76; // --nav-height offset
          const elTop = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: Math.max(0, elTop),
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });
        }
        window.history.replaceState(null, "", `#${sectionInfo.id}`);
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, prefersReducedMotion ? 150 : 600);
    },
    [prefersReducedMotion]
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
      setTimeout(() => {
        const el = document.getElementById(initialHash);
        if (el) {
          const navHeight = 76;
          const elTop = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: Math.max(0, elTop),
            behavior: "auto",
          });
        }
      }, 100);
    }
  }, []);

  // IntersectionObserver: passively updates activeSection as the user scrolls naturally
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observers: IntersectionObserver[] = [];
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = PORTFOLIO_SECTIONS.findIndex((s) => s.id === id);
          if (index >= 0 && index !== activeSectionRef.current) {
            activeSectionRef.current = index;
            setActiveSection(index);
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-25% 0px -40% 0px", // Active when section occupies viewport center
      threshold: [0, 0.25],
    });

    PORTFOLIO_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    // Provide testing/automation hook
    const win = window as unknown as {
      __goToSection?: (i: number) => void;
      __portfolioGoToSection?: (i: number) => void;
      __getActiveSection?: () => number;
    };
    win.__goToSection = goToSection;
    win.__portfolioGoToSection = goToSection;
    win.__getActiveSection = () => activeSectionRef.current;

    return () => {
      observer.disconnect();
    };
  }, [goToSection]);

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
