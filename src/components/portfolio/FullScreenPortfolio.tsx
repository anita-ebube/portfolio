"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSectionTransition } from "./SectionTransitionContext";
import { SectionPaginationRail } from "./SectionPaginationRail";
import { HomeScene } from "@/components/sections/portfolio/HomeScene";
import { AboutScene } from "@/components/sections/portfolio/AboutScene";
import { ExperienceScene } from "@/components/sections/portfolio/ExperienceScene";
import { WhatIWorkWithScene } from "@/components/sections/portfolio/WhatIWorkWithScene";
import { ProjectsScene } from "@/components/sections/portfolio/ProjectsScene";
import { ContactScene } from "@/components/sections/portfolio/ContactScene";
import { usePrefersReducedMotion } from "@/lib/motion";

const SCENES = [
  { index: 0, id: "home", component: HomeScene },
  { index: 1, id: "about", component: AboutScene },
  { index: 2, id: "experience", component: ExperienceScene },
  { index: 3, id: "work-with", component: WhatIWorkWithScene },
  { index: 4, id: "projects", component: ProjectsScene },
  { index: 5, id: "contact", component: ContactScene },
];

export function FullScreenPortfolio() {
  const { activeSection, isTransitioning } = useSectionTransition();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-canvas">
      {/* Top Precision Scene Transition Progress Indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 h-[2px] bg-lime shadow-[0_0_12px_#c8ff00] z-[60] origin-left pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Side Tactical Pagination Rail */}
      <SectionPaginationRail />

      {/* Cinematic Full-Screen Stack of 5 Scenes */}
      <div className="relative h-full w-full">
        {SCENES.map((scene) => {
          const isCurrent = scene.index === activeSection;
          const isPast = scene.index < activeSection;
          const isFuture = scene.index > activeSection;

          // Target animation state based on active section
          let y = "0%";
          let scale = 1;
          let opacity = 1;
          let zIndex = 20;

          if (isCurrent) {
            y = "0%";
            scale = 1;
            opacity = 1;
            zIndex = 25;
          } else if (isPast) {
            // Past sections ease slightly upward and dim underneath
            y = "-14%";
            scale = 0.94;
            opacity = 0;
            zIndex = 10 + scene.index;
          } else if (isFuture) {
            // Future sections wait below the screen to slide upward
            y = "100%";
            scale = 1;
            opacity = 1;
            zIndex = 30 + scene.index;
          }

          const Component = scene.component;

          return (
            <motion.div
              key={scene.id}
              initial={false}
              animate={{
                y,
                scale,
                opacity,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : {
                      duration: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              style={{
                zIndex,
                pointerEvents: isCurrent ? "auto" : "none",
              }}
              className="absolute inset-0 h-full w-full will-change-transform"
            >
              <Component />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
