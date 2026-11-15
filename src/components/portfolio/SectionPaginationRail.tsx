"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  PORTFOLIO_SECTIONS,
  TOTAL_SECTIONS,
  useSectionTransition,
} from "./SectionTransitionContext";
import { usePrefersReducedMotion } from "@/lib/motion";

export function SectionPaginationRail() {
  const { activeSection, goToSection, nextSection } = useSectionTransition();
  const prefersReducedMotion = usePrefersReducedMotion();

  const nextSectionInfo =
    activeSection < TOTAL_SECTIONS - 1
      ? PORTFOLIO_SECTIONS[activeSection + 1]
      : null;

  return (
    <>
      {/* Right-Hand Tactical Vertical Pagination Rail */}
      <aside
        aria-label="Section Navigation Rail"
        className="fixed right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
      >
        {/* Section Counter Badge */}
        <div className="rounded-full border border-[rgba(243,242,238,0.12)] bg-[rgba(13,15,18,0.8)] px-2.5 py-1 text-center font-mono text-[10px] tracking-[0.16em] text-ink-muted backdrop-blur-md">
          <span className="font-semibold text-lime">
            {PORTFOLIO_SECTIONS[activeSection]?.num}
          </span>
          <span className="mx-1 opacity-40">/</span>
          <span>0{TOTAL_SECTIONS}</span>
        </div>

        {/* Vertical Dot Track */}
        <div className="flex flex-col items-center gap-3 py-1">
          {PORTFOLIO_SECTIONS.map((sec) => {
            const isActive = sec.index === activeSection;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => goToSection(sec.index)}
                aria-label={`Jump to section ${sec.num}: ${sec.label}`}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex items-center justify-center p-1.5 focus-visible:outline-2 focus-visible:outline-lime cursor-pointer"
              >
                {/* Visual Dot / Pill */}
                <div
                  className={`relative rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-6 w-1.5 bg-lime shadow-[0_0_12px_rgba(200,255,0,0.5)]"
                      : "h-2 w-2 bg-[rgba(243,242,238,0.22)] group-hover:scale-125 group-hover:bg-ink"
                  }`}
                />

                {/* Floating Tooltip Tag */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[rgba(243,242,238,0.12)] bg-[rgba(7,8,9,0.92)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 translate-x-1"
                >
                  <span className="text-lime mr-1.5">{sec.num}</span>
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Floating Bottom Advance Prompt for Scene Switching */}
      {nextSectionInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-5 right-4 sm:right-6 lg:right-8 z-40 hidden sm:block"
        >
          <button
            type="button"
            onClick={nextSection}
            className="group flex items-center gap-2.5 rounded-full border border-[rgba(243,242,238,0.14)] bg-[rgba(13,15,18,0.85)] px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-secondary backdrop-blur-xl transition-all duration-300 hover:border-lime hover:text-ink cursor-pointer shadow-lg"
          >
            <span className="text-ink-muted group-hover:text-lime transition-colors">
              Next:
            </span>
            <span className="text-ink font-semibold">{nextSectionInfo.label}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(243,242,238,0.15)] bg-canvas transition-colors group-hover:border-lime group-hover:bg-lime/10">
              <ChevronDown
                className="h-3 w-3 text-ink-secondary group-hover:text-lime transition-colors motion-safe:animate-bounce"
                aria-hidden="true"
              />
            </span>
          </button>
        </motion.div>
      )}
    </>
  );
}
