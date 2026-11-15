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

const SCENES = [
  { index: 0, id: "home", component: HomeScene },
  { index: 1, id: "about", component: AboutScene },
  { index: 2, id: "experience", component: ExperienceScene },
  { index: 3, id: "work-with", component: WhatIWorkWithScene },
  { index: 4, id: "projects", component: ProjectsScene },
  { index: 5, id: "contact", component: ContactScene },
];

export function FullScreenPortfolio() {
  const { isTransitioning } = useSectionTransition();

  return (
    <div className="relative w-full bg-canvas">
      {/* Top Precision Scene Transition Progress Indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 h-[2px] bg-lime shadow-[0_0_12px_#c8ff00] z-[60] origin-left pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Side Tactical Pagination Rail / Scroll-Spy */}
      <SectionPaginationRail />

      {/* Continuous Natural Vertical Document Flow */}
      <div className="relative w-full flex flex-col divide-y divide-[rgba(243,242,238,0.06)]">
        {SCENES.map((scene) => {
          const Component = scene.component;
          return <Component key={scene.id} />;
        })}
      </div>
    </div>
  );
}
