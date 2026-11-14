"use client";

import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

interface FallingTechPillsProps {
  technologies: string[];
  projectId: string;
  isActiveSection?: boolean;
  className?: string;
  maxDisplay?: number;
}

// Core anchor technologies that receive the subtle electric lime indicator pip
const CORE_ACCENT_TECHS = new Set([
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "WebSocket",
  "Mapbox GL",
  "HTML5 QR",
  "Socket.io",
]);

// Deterministic trajectory generator for consistent physical falling motion
function getPillVariants(index: number): Variants {
  // Unique offsets per pill index
  const startY = -42 - ((index * 13) % 24); // Between -42px and -66px
  const startRotate = ((index * 7) % 17) - 8; // Between -8deg and +8deg
  const startX = ((index * 5) % 11) - 5; // Drift between -5px and +5px

  return {
    hidden: {
      opacity: 0,
      y: startY,
      x: startX,
      rotate: startRotate,
      scale: 0.88,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 190,
        damping: 14,
        mass: 0.75,
        delay: index * 0.055,
      },
    },
  };
}

export const FallingTechPills = memo(function FallingTechPills({
  technologies,
  projectId,
  isActiveSection = true,
  className = "",
  maxDisplay,
}: FallingTechPillsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const displayedTechs = maxDisplay
    ? technologies.slice(0, maxDisplay)
    : technologies;

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 sm:gap-2 select-none ${className}`}
      aria-label="Technologies used"
    >
      {displayedTechs.map((tech, index) => {
        const isCore = CORE_ACCENT_TECHS.has(tech);
        const variants = getPillVariants(index);
        const hoverRotate = (index % 2 === 0 ? -1.5 : 1.5);

        return (
          <motion.div
            key={`${projectId}-${tech}`}
            custom={index}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isActiveSection ? "visible" : "hidden"}
            variants={variants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -3,
                    rotate: hoverRotate,
                    scale: 1.04,
                    transition: { duration: 0.18, ease: "easeOut" },
                  }
            }
            className={`group relative inline-flex items-center gap-1.5 rounded-full border border-[rgba(243,242,238,0.13)] bg-[rgba(16,19,24,0.85)] px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] sm:text-[11.5px] font-medium tracking-[0.02em] text-ink-secondary backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:border-[rgba(200,255,0,0.6)] hover:bg-[rgba(200,255,0,0.08)] hover:text-ink hover:shadow-[0_4px_16px_rgba(200,255,0,0.18)] cursor-default will-change-transform ${
              isCore ? "border-[rgba(200,255,0,0.22)]" : ""
            }`}
          >
            {/* Subtle physical capsule metallic highlight reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent opacity-60 group-hover:via-lime/50 transition-opacity"
            />

            {/* Electric lime status pip for core architecture components */}
            {isCore && (
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime shadow-[0_0_6px_rgba(200,255,0,0.7)] transition-transform duration-200 group-hover:scale-125"
              />
            )}

            <span className="relative z-10 leading-none">{tech}</span>
          </motion.div>
        );
      })}
    </div>
  );
});
