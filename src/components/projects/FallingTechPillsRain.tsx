"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

interface FallingPillSlot {
  id: number;
  laneLeft: string; // horizontal percentage position
  isForeground: boolean; // z-25 vs z-10 (behind content)
  finish: "lime" | "metallic" | "carbon" | "neutral";
  duration: number; // fall duration in seconds
  delay: number; // negative start delay in seconds
  rotStart: number;
  rotEnd: number;
  driftX: number;
  scale: number;
  opacity: number;
  mobileVisible?: boolean;
}

// Bounded deterministic slots across the viewport
const SLOTS: FallingPillSlot[] = [
  // 1. Far Left Margin (Foreground gutter - left of text)
  {
    id: 0,
    laneLeft: "1%",
    isForeground: true,
    finish: "lime",
    duration: 11.5,
    delay: -2.4,
    rotStart: -8,
    rotEnd: 6,
    driftX: 8,
    scale: 0.95,
    opacity: 0.9,
    mobileVisible: false,
  },
  // 2. Far Left Behind (passes behind left edge of text with deep blur)
  {
    id: 1,
    laneLeft: "8%",
    isForeground: false,
    finish: "metallic",
    duration: 15.2,
    delay: -8.0,
    rotStart: 10,
    rotEnd: -4,
    driftX: -10,
    scale: 0.85,
    opacity: 0.25,
    mobileVisible: true,
  },
  // 3. Left-Center Behind (passes behind text)
  {
    id: 2,
    laneLeft: "22%",
    isForeground: false,
    finish: "carbon",
    duration: 17.0,
    delay: -12.5,
    rotStart: -12,
    rotEnd: 7,
    driftX: 10,
    scale: 0.82,
    opacity: 0.22,
    mobileVisible: true,
  },
  // 4. Center-Left Behind
  {
    id: 3,
    laneLeft: "34%",
    isForeground: false,
    finish: "neutral",
    duration: 14.0,
    delay: -4.8,
    rotStart: 6,
    rotEnd: -7,
    driftX: -8,
    scale: 0.84,
    opacity: 0.22,
    mobileVisible: false,
  },
  // 5. Center Channel Gutter (Foreground - between left text and right preview!)
  {
    id: 4,
    laneLeft: "42.5%",
    isForeground: true,
    finish: "metallic",
    duration: 10.8,
    delay: -6.2,
    rotStart: -6,
    rotEnd: 10,
    driftX: 12,
    scale: 1.0,
    opacity: 0.95,
    mobileVisible: false,
  },
  // 6. Center Channel Gutter 2 (Foreground)
  {
    id: 5,
    laneLeft: "45.5%",
    isForeground: true,
    finish: "lime",
    duration: 12.4,
    delay: -1.6,
    rotStart: 8,
    rotEnd: -6,
    driftX: -10,
    scale: 0.98,
    opacity: 0.92,
    mobileVisible: false,
  },
  // 7. Right Card Background (passes behind preview card)
  {
    id: 6,
    laneLeft: "60%",
    isForeground: false,
    finish: "carbon",
    duration: 16.2,
    delay: -9.8,
    rotStart: -10,
    rotEnd: 5,
    driftX: 14,
    scale: 0.86,
    opacity: 0.26,
    mobileVisible: true,
  },
  // 8. Right Card Background 2 (passes behind preview card)
  {
    id: 7,
    laneLeft: "76%",
    isForeground: false,
    finish: "metallic",
    duration: 14.2,
    delay: -3.5,
    rotStart: 11,
    rotEnd: -6,
    driftX: -12,
    scale: 0.88,
    opacity: 0.28,
    mobileVisible: true,
  },
  // 9. Far Right Margin Gutter (Foreground - right of the preview card)
  {
    id: 8,
    laneLeft: "93%",
    isForeground: true,
    finish: "lime",
    duration: 11.0,
    delay: -7.6,
    rotStart: -7,
    rotEnd: 9,
    driftX: -8,
    scale: 1.02,
    opacity: 0.95,
    mobileVisible: false,
  },
  // 10. Far Right Edge Gutter (Foreground)
  {
    id: 9,
    laneLeft: "96%",
    isForeground: true,
    finish: "neutral",
    duration: 14.5,
    delay: -11.2,
    rotStart: 5,
    rotEnd: -8,
    driftX: 6,
    scale: 0.95,
    opacity: 0.88,
    mobileVisible: false,
  },
  // 11. Top Center Behind
  {
    id: 10,
    laneLeft: "52%",
    isForeground: false,
    finish: "lime",
    duration: 13.0,
    delay: -5.2,
    rotStart: 7,
    rotEnd: -5,
    driftX: 10,
    scale: 0.92,
    opacity: 0.35,
    mobileVisible: true,
  },
];

interface FallingTechPillsRainProps {
  technologies: string[];
  projectId: string;
  isActiveSection: boolean;
}

export function FallingTechPillsRain({
  technologies,
  projectId,
  isActiveSection,
}: FallingTechPillsRainProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // If reduced motion is requested, do not render continuous vertical rain
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden select-none"
      style={{
        contain: "layout paint size",
      }}
    >
      <style>{`
        @keyframes pill-vertical-fall {
          0% {
            transform: translate3d(0, -140px, 0) rotate(var(--rot-start, -6deg));
            opacity: 0;
          }
          6% {
            opacity: var(--pill-opacity, 0.85);
          }
          92% {
            opacity: var(--pill-opacity, 0.85);
          }
          100% {
            transform: translate3d(var(--drift-x, 0px), calc(100svh + 160px), 0) rotate(var(--rot-end, 6deg));
            opacity: 0;
          }
        }
        .animate-pill-fall {
          animation-name: pill-vertical-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
      `}</style>
      {SLOTS.map((slot, index) => {
        // Map slot to authentic technology from the active project stack
        const techName = technologies[index % technologies.length] || technologies[0];

        // Variant styles
        let finishClasses = "";
        let pipColor = "";

        switch (slot.finish) {
          case "lime":
            finishClasses =
              "bg-[rgba(200,255,0,0.12)] border-[rgba(200,255,0,0.65)] text-lime shadow-[0_8px_30px_rgba(200,255,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.45)]";
            pipColor = "bg-lime shadow-[0_0_8px_#c8ff00]";
            break;
          case "metallic":
            finishClasses =
              "bg-gradient-to-b from-[rgba(255,255,255,0.18)] via-[rgba(28,32,38,0.92)] to-[rgba(10,12,15,0.96)] border-[rgba(243,242,238,0.34)] text-ink shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1.5px_1px_rgba(255,255,255,0.45)]";
            pipColor = "bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.6)]";
            break;
          case "carbon":
            finishClasses =
              "bg-[rgba(14,17,21,0.92)] border-[rgba(243,242,238,0.18)] text-ink-secondary shadow-[0_10px_24px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)]";
            pipColor = "bg-ink-muted";
            break;
          case "neutral":
          default:
            finishClasses =
              "bg-[rgba(255,255,255,0.07)] border-[rgba(243,242,238,0.24)] text-ink shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]";
            pipColor = "bg-lime/70 shadow-[0_0_6px_rgba(200,255,0,0.4)]";
            break;
        }

        // Layering: background slots (z-5) pass behind main cards; foreground slots (z-22) sit in gutters
        const zIndex = slot.isForeground ? 22 : 5;

        return (
          <div
            key={`${projectId}-${slot.id}`}
            className={`absolute top-0 will-change-transform animate-pill-fall ${
              slot.mobileVisible ? "block" : "hidden sm:block"
            }`}
            style={
              {
                left: slot.laneLeft,
                zIndex,
                animationDuration: `${slot.duration}s`,
                animationDelay: `${slot.delay}s`,
                animationPlayState: isActiveSection ? "running" : "paused",
                // Dynamic CSS variables driving the keyframe physics
                "--rot-start": `${slot.rotStart}deg`,
                "--rot-end": `${slot.rotEnd}deg`,
                "--drift-x": `${slot.driftX}px`,
                "--pill-opacity": slot.opacity,
              } as React.CSSProperties
            }
          >
            {/* The Bold Physical Capsule Pill */}
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md transition-transform duration-300 ${finishClasses}`}
              style={{
                transform: `scale(${slot.scale})`,
              }}
            >
              {/* Glowing Luminous Pip */}
              <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full shrink-0 ${pipColor}`} />

              {/* Bold Technology Typography */}
              <span className="font-display text-[11px] sm:text-[13px] font-bold uppercase tracking-wider whitespace-nowrap">
                {techName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
